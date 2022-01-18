import "./App.css";
import Graph from "./components/graph/Graph";
import Table from "./components/table/Table";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [vehicles, setVehicles] = useState();
  const [peoples, setPeoples] = useState();
  const [planets, setPlanets] = useState();

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
          vehiclesPilotsArray.push(data.results[i].pilots);
        }
      }
      if (data.next) {
        getAllVehicles(data.next);
      } else {
        setVehicles(vehiclesPilotsArray);
        // console.log('vehicles: ',vehiclesPilotsArray)
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
    // console.log(vehiclesArray);
    return vehiclesArray?.forEach((arr) => {
      // console.log(arr.length)
      for (let i = 0; i < arr.length; i++) {
        peoples?.forEach((p) => {
          if (p.url === arr[i]) {
            debugger;
            planets.forEach((planet) => {
              if (planet.url === p.homeworld) {
                console.log(`${planet.name} population: ${planet.population}`);
              }
            });
          }
        });
      }
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
