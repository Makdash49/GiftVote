var $ = require('jquery');

module.exports = {
  userOneFilterProducts: function (products) {
    var filteredProducts = products;

    var newFilteredProducts = filteredProducts.sort((a, b) => {
      if(a.createdAt <= b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });

    newFilteredProducts.sort((a, b) => {
      if(a.counterUserOne > b.counterUserOne) {
        return -1;
      } else if (a.counterUserOne < b.counterUserOne) {
        return 1;
      } else {
        return 0
      }
    });

    return newFilteredProducts;
  },
  userTwofilterProducts: function (products) {
    var filteredProducts = products;

    var newFilteredProducts = filteredProducts.sort((a, b) => {
      if(a.createdAt <= b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });

    newFilteredProducts.sort((a, b) => {
      if(a.counterUserTwo > b.counterUserTwo) {
        return -1;
      } else if (a.counterUserTwo < b.counterUserTwo) {
        return 1;
      } else {
        return 0
      }
    });

    return newFilteredProducts;
  },
  totalFilterProducts: function (products, userOneTotal, userTwoTotal) {
    var filteredProducts = products;

    var newFilteredProducts = filteredProducts.sort((a, b) => {
      if(a.createdAt <= b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });

    newFilteredProducts.sort((a, b) => {
      var apercentageUserOne = Math.round((a.counterUserOne / userOneTotal) * 100);
      var apercentageUserTwo = Math.round((a.counterUserTwo / userTwoTotal) * 100);


      isNaN(apercentageUserOne) ? apercentageUserOne = 0 : apercentageUserOne = apercentageUserOne;
      isNaN(apercentageUserTwo) ? apercentageUserTwo = 0 : apercentageUserTwo = apercentageUserTwo;
      var aFinalPercentage = apercentageUserOne + apercentageUserTwo;


      var bpercentageUserOne = Math.round((b.counterUserOne / userOneTotal) * 100);
      var bpercentageUserTwo = Math.round((b.counterUserTwo / userTwoTotal) * 100);

      isNaN(bpercentageUserOne) ? bpercentageUserOne = 0 : bpercentageUserOne = bpercentageUserOne;
      isNaN(bpercentageUserTwo) ? bpercentageUserTwo = 0 : bpercentageUserTwo = bpercentageUserTwo;
      var bFinalPercentage = bpercentageUserOne + bpercentageUserTwo;

      if(aFinalPercentage > bFinalPercentage) {
        return -1;
      } else if (aFinalPercentage < bFinalPercentage) {
        return 1;
      } else {
        return 0
      }
    });

    return newFilteredProducts;
  },

};
