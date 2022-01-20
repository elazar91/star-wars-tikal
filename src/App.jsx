import "./App.css";
import Graph from "./components/graph/Graph";
import Table from "./components/table/Table";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [vehicles, setVehicles] = useState();
  const [peoples, setPeoples] = useState();
  const [planets, setPlanets] = useState();
  // const [populationByVehicles, setPopulationByVehicles] = useState();
  const [largesPopulationByVehicles, setLargesPopulationByVehicles] =
    useState();
  let largestPopulationByVehicles = {};

  // console.log(populationByVehicles);
  useEffect(
    getAllDitales,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(
    () => findPeopleInVehicles(vehicles),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [peoples]
  );

  const vehiclesPilotsArray = [];
  const peopleNamesArray = [];
  const homeworldArray = [];
  const populationByVehiclesArray = [];

  function getAllDitales() {
    function getDitales(apiURL, showDitales) {
      axios.get(apiURL).then((response) => {
        showDitales(response.data, showDitales);
      });
    }

    function showAllPeopel(data) {
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].vehicles.length > 0) {
          peopleNamesArray.push({
            name: data.results[i].name,
            homeworld: data.results[i].homeworld,
            vehicles: data.results[i].vehicles,
            url: data.results[i].url,
          });
        }
      }
      if (data.next) {
        getDitales(data.next, showAllPeopel);
      } else {
        setPeoples(peopleNamesArray);
      }
    }

    function showAllVehicles(data) {
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].pilots?.length >= 1) {
          vehiclesPilotsArray.push({
            pailotUrl: data.results[i].pilots,
            name: data.results[i].name,
            sumPopulation: 0,
          });
        }
      }
      if (data.next) {
        getDitales(data.next, showAllVehicles);
      } else {
        setVehicles(vehiclesPilotsArray);
      }
    }

    function showHomeworld(data) {
      for (let i = 0; i < data.results.length; i++) {
        homeworldArray.push({
          name: data.results[i].name,
          population: data.results[i].population,
          url: data.results[i].url,
        });
      }
      if (data.next) {
        getDitales(data.next, showHomeworld);
      } else {
        setPlanets(homeworldArray);
      }
    }

    getDitales("https://swapi.py4e.com/api/people/", showAllPeopel);
    getDitales("https://swapi.py4e.com/api/vehicles/", showAllVehicles);
    getDitales("https://swapi.py4e.com/api/planets/", showHomeworld);
  }

  function findPeopleInVehicles(vehiclesArray) {
    return vehiclesArray?.forEach((arr) => {
      for (let i = 0; i < arr.pailotUrl.length; i++) {
        peoples?.forEach((p) => {
          if (p.url === arr.pailotUrl[i]) {
            planets.forEach((planet) => {
              if (planet.url === p.homeworld) {
                populationByVehiclesArray.push({
                  name: arr.name,
                  population: planet.population,
                });
                // setPopulationByVehicles(
                mergePupolationByVehiclesArray(populationByVehiclesArray);
                // );
              }
            });
          }
        });
      }
    });
  }

  function mergePupolationByVehiclesArray(objArr) {
    objArr.forEach((obj) => {
      vehicles.forEach((v) => {
        if (v.name === obj.name) v.sumPopulation += obj.population * 1;
      });
      largestPopulationByVehicles = returnLagest(vehicles);
      const thePilots = peoples.filter(
        (people) => people.url === vehicles.pailotUrl
      );
      setLargesPopulationByVehicles({
        ...largestPopulationByVehicles,
        thePilots,
      });
    });
  }

  function returnLagest(vehicles) {
    return vehicles.reduce((acc, cur) => {
      return acc.sum > cur.sum ? acc : cur;
    });
  }
  console.log(largesPopulationByVehicles);
  return (
    <div className="App">
      <Table population={largesPopulationByVehicles} />
      <Graph planets={planets} />
    </div>
  );
}

export default App;
