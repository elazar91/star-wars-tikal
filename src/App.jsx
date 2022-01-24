import "./App.css";
import Graph from "./components/graph/Graph";
import Table from "./components/table/Table";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [vehicles, setVehicles] = useState();
  const [pilots, setPilots] = useState();
  const [planets, setPlanets] = useState();
  const [vehicleData, setVehicleData] = useState();
  const [data, setData] = useState();
  let largestPopulationByVehicles = {};
  // let filterdData = [];

  useEffect(
    getAllDitales,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(
    () => findPilotInVehicles(vehicles),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pilots]
  );

  const vehiclesPilotsArray = [];
  const pilotsArray = [];
  const homeworldArray = [];
  const populationByVehiclesArray = [];

  function getAllDitales() {
    function getDitales(apiURL, showDitales) {
      axios.get(apiURL).then((response) => {
        showDitales(response.data, showDitales);
      });
    }

    function showAllPilotes(data) {
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].vehicles.length > 0) {
          pilotsArray.push({
            name: data.results[i].name,
            homeworld: data.results[i].homeworld,
            vehicles: data.results[i].vehicles,
            url: data.results[i].url,
          });
        }
      }
      if (data.next) {
        getDitales(data.next, showAllPilotes);
      } else {
        setPilots(pilotsArray);
      }
    }

    function showAllVehicles(data) {
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].pilots?.length >= 1) {
          vehiclesPilotsArray.push({
            pilotUrl: data.results[i].pilots,
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

    getDitales("https://swapi.py4e.com/api/people/", showAllPilotes);
    getDitales("https://swapi.py4e.com/api/vehicles/", showAllVehicles);
    getDitales("https://swapi.py4e.com/api/planets/", showHomeworld);
  }

  function findPilotInVehicles(vehiclesArray) {
    return vehiclesArray?.forEach((arr) => {
      for (let i = 0; i < arr.pilotUrl.length; i++) {
        pilots?.forEach((p) => {
          if (p.url === arr.pilotUrl[i]) {
            planets.forEach((planet) => {
              if (planet.url === p.homeworld) {
                populationByVehiclesArray.push({
                  name: arr.name,
                  population: planet.population,
                  pilot: p,
                });
                mergePupolationByVehiclesArray(populationByVehiclesArray);
                // setData(p);
              }
            });
          }
        });
      }
    });
  }

  function mergePupolationByVehiclesArray(objArr) {
    let planet;
    objArr.forEach((obj) => {
      vehicles.forEach((v) => {
        if (v.name === obj.name) {
          v.sumPopulation += obj.population * 1;
          planet = obj;
        }
      });
    });
    largestPopulationByVehicles = returnLagest(vehicles);
    setVehicleData({
      ...largestPopulationByVehicles,
      ...planet,
    });
  }

  function returnLagest(vehicles) {
    return vehicles.reduce((acc, cur) => {
      return acc.sum > cur.sum ? acc : cur;
    });
  }

  return (
    <div className="App">
      <Table data={vehicleData} />
      <Graph planets={planets} />
    </div>
  );
}

export default App;
