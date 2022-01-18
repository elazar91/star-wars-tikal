// import axios from "axios";

// const vehiclesPilotsArray = [];
// // const homeworldUrlArray = [];

// function getDetail(apiURL) {
//   axios.get(apiURL).then(function (response) {
//     showDetail(response.data);
//   });
// }

// function showDetail(data) {
//   // console.log(data)
//   for (let i = 0; i < data.results.length; i++) {
//     if (data.results[i].vehicles.length >= 1) {
//       vehiclesPilotsArray.push(data.results[i].pilots);
//       // homeworldUrlArray.push(data.results[i].homeworld);
//     }
//   }
//   if (data.next) {
//     getDetail(data.next);
//   } else {
//     console.log(vehiclesPilotsArray);
//     // console.log(homeworldUrlArray);
//   }
// }
// getDetail("https://swapi.py4e.com/api/vehicles/");
