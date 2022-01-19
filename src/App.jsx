import "./App.css";
import Graph from "./components/graph/Graph";
import Table from "./components/table/Table";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [vehicles, setVehicles] = useState();
  const [peoples, setPeoples] = useState();
  const [planets, setPlanets] = useState();
  const [populationByVehicles, setPopulationByVehicles] = useState();

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
    function getAllPeopel(apiURL) {
      axios.get(apiURL).then((response) => {
        showAllPeopel(response.data);
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
        getAllPeopel(data.next);
      } else {
        setPeoples(peopleNamesArray);
        console.log("people: ", peopleNamesArray);
      }
    }

    function getAllVehicles(apiURL) {
      axios.get(apiURL).then((response) => {
        showAllVehicles(response.data);
      });
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
        getAllVehicles(data.next);
      } else {
        setVehicles(vehiclesPilotsArray);
        console.log("vehicles: ", vehiclesPilotsArray);
      }
    }

    function getHomeworld(apiURL) {
      axios.get(apiURL).then((response) => {
        showHomeworld(response.data);
      });
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
        getHomeworld(data.next);
      } else {
        setPlanets(homeworldArray);
        console.log("homeWorld: ", homeworldArray);
      }
    }

    getAllPeopel("https://swapi.py4e.com/api/people/");
    getAllVehicles("https://swapi.py4e.com/api/vehicles/");
    getHomeworld("https://swapi.py4e.com/api/planets/");
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
                setPopulationByVehicles(
                  mergePupolationByVehiclesArray(populationByVehiclesArray)
                );
                // console.log(
                //   mergePupolationByVehiclesArray(populationByVehiclesArray)
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
      console.log(vehicles);
    });
  }

  return (
    <div className="App">
      <Table />
      <Graph />
    </div>
  );
}

export default App;
