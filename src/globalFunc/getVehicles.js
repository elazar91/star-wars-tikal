import axios from "axios";

const vehiclesPilotsArray = [];

export function getDetail(apiURL) {
  axios.get(apiURL).then((response) => {
    showDetail(response.data);
  });
}

function showDetail(data) {
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].pilots.length >= 1) {
      vehiclesPilotsArray.push(data.results[i].pilots);
    }
  }
  if (data.next) {
    getDetail(data.next);
  } else {
    return vehiclesPilotsArray
  }
}
export const getAllPeople = getDetail("https://swapi.py4e.com/api/vehicles/");
