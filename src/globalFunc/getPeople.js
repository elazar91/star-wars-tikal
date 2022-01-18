import axios from "axios";

export const peopleNamesArray = [];

function getAllPeopel(apiURL) {
  axios.get(apiURL).then(response => {
    showAllPeopel(response.data);
  });
}

function showAllPeopel(data) {
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].vehicles.length > 0) {
      peopleNamesArray.push({ 
        name: data.results[i].name, 
        homeworld: data.results[i].homeworld, 
        vehicles: data.results[i].vehicles
      });
    }
  }
  if (data.next) {
    getAllPeopel(data.next);
  } else {
    return peopleNamesArray
  }
}
getAllPeopel("https://swapi.py4e.com/api/people/");
