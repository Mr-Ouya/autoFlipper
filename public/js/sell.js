var $submitBtn = $("#submit");
var selectSellMake = $("#inputMake");
var selectSellModel = $("#inputModel");
var inputPrice = $("#inputPrice");
var inputDescrpt = $("#typeDes");
var inputYear = $("#inputYear")
var newImage = $("")
var optionMake = $(".newoptions");
var modelSellNames = [];
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
      url: "/autoflipper/api/vehicle",
      data: JSON.stringify(example)
    });
  },

};




////////////

$(document).ready(function () {
  selectSellModel.prop("disabled", true)
})

popFirstItem(selectSellMake, popularVehicle);
function popFirstItem(select, data) {
  console.log(select);
  var firstdrop = select;
  for (var i = 0; i < data.length; i++) {
    var newSelect = $("<option></option").text(data[i]);
    newSelect.val(data[i]);
    newSelect.addClass("newoptions");
    newSelect.data(data[i]);
    newSelect.onclick = popnewItems;
    firstdrop.append(newSelect);
  }
}
/////////////////////////////
function popItems(select, data) {
  var firstdrop = select;
  if (firstdrop === selectSellModel) {
    firstdrop.not(".newoptions");
  }
  for (var i = 0; i < data.length; i++) {
    var newSelect = $("<option></option").text(data[i]);
    newSelect.val(data[i]);
    newSelect.addClass("newoptions");
    newSelect.data(data[i]);
    newSelect.onclick = popnewItems;
    firstdrop.append(newSelect);
  }
}
/////////////////////////////
var popnewItems = function () {
  dropdownEnable()
  var make = $(this).val();
  console.log(make)
  console.log(modelSellNames);
  callmake(make, function (make) {
    console.log(make)
    popItems(selectSellModel, modelSellNames);
    popItems(inputYear, years);
  });
}
/////////////////////////////
function callmake(make, cb) {
  $.ajax({
    url: "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/" + make + "?format=json",
    success: function (result) {
      modelSellNames = [];
      for (var i = 0; i < result.Results.length; i++) {
        model = result.Results[i].Model_Name;
        modelSellNames.push(model);
      }
      cb(modelSellNames);
    }
  })
}
/////////////////////////////
var handleFormSubmit = function (event) {
  event.preventDefault();
  var newVehicle = {
   // vehicle: newType.val().trim(),
    make: selectSellMake.val(),
    model: selectSellModel.val(),
    price: inputPrice.val().trim(),
    description: inputDescrpt.val().trim(),
    year: inputYear.val(),
  };
  console.log(newVehicle)
  if (!(newVehicle.make && newVehicle.model && newVehicle.price && newVehicle.year )) {
    alert("Enter information");
    return;
  }
  API.saveOne(newVehicle).then(function () {
  });
  newType.val("");
  newMake.val("");
  newModel.val("");
  newPrice.val("");
  newDescrpt.val("");
  newYear.val("");
  newDescrpt.val("");
};
/////////////////////////////
/////////////////////////////

////////////////////////////
function dropdownEnable() {
  selectSellModel.prop("disabled", false)
  selectSellMake.prop("disabled", false)
}
/////////////////////////////
$submitBtn.on("click", handleFormSubmit);
$("#inputMake").on("change", optionMake, popnewItems)
/* eslint-enable camelcase */