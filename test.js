const axios = require("axios").default;

const options = {
  method: "GET",
  url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
  params: { ingr: "apple" },
  headers: {
    "x-rapidapi-key": "f56971095fmshece1d6c01f9c852p1145f5jsn49a1e2fe756d",
    "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    const filteredList = response.data.hints
      .filter((item) => item.food.category === "Generic foods")
      .map((item) => item.food.label);
    console.log(filteredList);
  })
  .catch(function (error) {
    console.error(error);
  });

// var axios = require("axios").default;

// var options = {
//   method: "GET",
//   url:
//     "https://chomp-food-nutrition-database-v2.p.rapidapi.com/food/branded/name.php",
//   params: { name: "Pop-Tarts", limit: "3", page: "1" },
//   headers: {
//     "content-type": "application/json",
//     "x-rapidapi-key": "f56971095fmshece1d6c01f9c852p1145f5jsn49a1e2fe756d",
//     "x-rapidapi-host": "chomp-food-nutrition-database-v2.p.rapidapi.com",
//   },
//   data: {},
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
