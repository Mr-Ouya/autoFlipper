// Get references to page elements

var $submitBtn = $("#submit");
var submitSearch = $("#submitSearch");
var newType = $("#typeV");
var newMake = $("#typeMake");
var newModel = $("#typeModel");
var newPrice = $("#typePrice");
var newDescrpt = $("#typeDes");
var newYear = $("#typeYear")
var newImage = $("");
var modSea = $("#btnmodel");
var makeSea = $("#btnmake");
var yearSea = $("#btnyear")
var priceSea = $("#btnprice");
var optionMake = $(".newoptions");
var select1Make = $("#makeSelect1")
var selectModel = $("#modelSelect1")
var selectMinY = $("#yearminSelect1");
var selectMaxY = $("#yearmaxSelect1");
var selectMin = $("#minSelect1");
var selectMax = $("#maxSelect1");
var modelNames = [];
//objectVehicle

popularVehicle = ["BMW", "Chevrolet", "Dodge", "Ford", "GMC", "Hyundai", "Jeep", "Toyota", "Honda", "Nissan", "Ram", "KIA", "Subaru", "Mazada", "Mercedes_Benz", "Volksvagen"];
years = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
price = ["1000", "5000", "10000", "15000", "20000", "25000", "30000", "35000", "40000", "45000", "50000", "55000", "60000", "65000", "70000", "75000"]
////////////
var API = {
  saveOne: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/vehicle",
      data: JSON.stringify(example)
    });
  },
  getAll: function () {
    return $.ajax({
      url: "api/vehicle",
      type: "GET"
    });
  },
  getSearch: function (data) {
    console.log("/api/vehicle/:make/:model/:yearmin/:yearmax/:pricemin/:pricemax");
    console.log(":make/:model/:yearmin/:yearmax/:pricemin/:pricemax");
    return $.ajax({
      url: "/api/vehicle" + data,
      //FULL URL 
      type: "GET",
      // data: JSON.stringify(data)
    });
  },
  getSearchMake: function () {
    return $.ajax({
      url: "api/vehicle/" + make,
      type: "GET"
    });
  },
  getSearchModel: function () {
    return $.ajax({
      url: "api/vehicle/" + make + model,
      type: "GET"
    });
  },

  deleteOne: function (id) {
    return $.ajax({
      url: "api/vehicle/" + id,
      type: "DELETE"
    });
  }
};




////////////

$(document).ready(function () {

  selectModel.prop("disabled", true)
  selectMinY.prop("disabled", true)
  selectMaxY.prop("disabled", true)
  selectMin.prop("disabled", true)
  selectMax.prop("disabled", true)
})

popFirstItem(select1Make, popularVehicle);



function popFirstItem(select, data) {
  console.log(select);

  var firstdrop = select;

  for (var i = 0; i < data.length; i++) {
    console.log(data);
    var newSelect = $("<option></option").text(data[i]);

    newSelect.val(data[i]);


    newSelect.addClass("newoptions");

    newSelect.data(data[i]);

    newSelect.onclick = popnewItems;
    //console.log(newSelect.val());
    firstdrop.append(newSelect);
  }

}


function popItems(select, data) {
  // dropdownEnable()
  var firstdrop = select;

  firstdrop.empty();
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    var newSelect = $("<option></option").text(data[i]);

    newSelect.val(data[i]);

    newSelect.addClass("newoptions");

    newSelect.data(data[i]);

    newSelect.onclick = popnewItems;
    firstdrop.append(newSelect);
  }

}




var popnewItems = function () {
  dropdownEnable()
  var make = $(this).val();


  console.log(make)

  console.log(modelNames);
  callmake(make, function (make) {

    console.log(make)

    popItems(selectModel, modelNames);
    popItems(selectMin, price);
    popItems(selectMax, price);
    popItems(selectMaxY, years);
    popItems(selectMinY, years);


  });



}



function callmake(make, cb) {
  $.ajax({
    url: "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/" + make + "?format=json",
    success: function (result) {
      //manually set up a append option likes orginally do for each statment is needed

      modelNames = [];
      for (var i = 0; i < result.Results.length; i++) {

        // console.log(result.Results[i].Model_Name);

        model = result.Results[i].Model_Name;
        modelNames.push(model);
      }

      //console.log(modelNames);

      cb(modelNames);
    }
  })
}




///////


// The API object contains methods for each kind of request we'll make


// refreshExamples gets new examples from the db and repopulates the list
var refreshData = function () {
  API.getAll().then(function (data) {

  })
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();
  console.log(newModel);
  var newVehicle = {
    vehicle: newType.val().trim(),
    make: newMake.val().trim(),
    model: newModel.val().trim(),
    price: newPrice.val(),
    description: newDescrpt.val().trim(),
    year: newYear.val()
  };
  console.log(newVehicle)

  if (!(newVehicle.vehicle && newVehicle.make && newVehicle.model)) {
    alert("Enter information");
    return;
  }

  API.saveOne(newVehicle).then(function () {
    refreshData();
  });
  newType.val("");
  newMake.val("");
  newModel.val("");
  newPrice.val("");
  newDescrpt.val("");
  newYear.val("");
  newDescrpt.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteOne(idToDelete).then(function () {
    refreshData();
  });
};
//ajax call to api with models, make , year

var searchDatabase = function () {
  //var selectedText = $(this).find("option:selected").text();

  console.log(select1Make.val());
  console.log(selectModel.val());
  console.log(selectMaxY.val());
  console.log(selectMinY.val());
  console.log(selectMin.val());
  console.log(selectMax.val());

  var modelV = select1Make.val();
  var mxY = selectMaxY.val();
  var mnY = selectMinY.val();
  var mxP = selectMax.val();
  var mxP = selectMin.val();



  var search = {

    make: select1Make.val(),
    model: selectModel.val(),
    minY: parseInt(selectMinY.val()),
    maxY: parseInt(selectMaxY.val()),
    minP: parseInt(selectMin.val()),
    maxP: parseInt(selectMax.val())

  }
  console.log(search)

  if (!(search.make && search.make && search.make, search.make, search.make, search.make)) {
    alert("Enter information");
    return;
  } else {
    newSeach = '/' + search.make + '/' + search.model + '/' + search.minY + "/" + search.maxY + '/' + search.minP + "/" + search.maxP;
    API.getSearch(newSeach).then(function (data) {
      console.log(data);
      console.log("searching");

    })






  }
}

function dropdownEnable() {

  selectModel.prop("disabled", false)
  selectMinY.prop("disabled", false)
  selectMaxY.prop("disabled", false)
  selectMin.prop("disabled", false)
  selectMax.prop("disabled", false)
}



// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$("#makeSelect1").on("change", optionMake, popnewItems)

submitSearch.on("click", searchDatabase);
//$exampleList.on("click", ".delete", handleDeleteBtnClick);
//get all content from database