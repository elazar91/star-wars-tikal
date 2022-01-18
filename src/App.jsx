import "./App.css";
import Graph from "./components/graph/Graph";
import Table from "./components/table/Table";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [peoples, setPeoples] = useState([]);
  const [population, setPopulation] = useState();

  useEffect(getAllDitales, []);
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
        });
      }
      if (data.next) {
        getHomeworld(data.next);
      } else {
        setPopulation(homeworldArray);
        console.log("homeWorld: ", homeworldArray);
      }
    }

    getAllPeopel("https://swapi.py4e.com/api/people/");
    getAllVehicles("https://swapi.py4e.com/api/vehicles/");
    getHomeworld("https://swapi.py4e.com/api/planets/");
    findPeopleInVehicles(vehiclesPilotsArray);
  }

  function findPeopleInVehicles(vehiclesArray) {
    return vehiclesArray.forEach((arr) =>
      arr.langth > 1
        ? findPeopleInVehicles(arr)
        : peopleNamesArray.find((p) => p.url === arr[0])
    );
  }

  return (
    <div className="App">
      <Table />
      <Graph />
    </div>
  );
}

export default App;
