// Get references to page elements
/* eslint-disable */
var $submitBtn = $("#submit");
var submitSearch = $("#submitSearch");
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
  getAll: function () {
    return $.ajax({
      url: "/autoflipper/api/vehicle/all",
      type: "GET",
    });
  },
  getSearch: function (data) {
    return $.ajax({
      url: "/autoflipper/api/vehicle" + data,
      //FULL URL 
      type: "GET",
      //   data: JSON.stringify(data)
    });
  },
  deleteOne: function (id) {
    return $.ajax({
      url: "/autoflipperapi/vehicle/" + id,
      type: "DELETE"
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
  selectModel.prop("disabled", true)
  selectMinY.prop("disabled", true)
  selectMaxY.prop("disabled", true)
  selectMin.prop("disabled", true)
  selectMax.prop("disabled", true)
})

popMakeSearch(select1Make, popularVehicle);
function popMakeSearch(select, data) {
  console.log(select);
  var firstdrop = select;
  for (var i = 0; i < data.length; i++) {
    var newSelect = $("<option></option").text(data[i]);
    newSelect.val(data[i]);
    newSelect.addClass("newoptions");
    newSelect.data(data[i]);
    newSelect.onclick = popNSeachI;
    firstdrop.append(newSelect);
  }
}
/////////////////////////////
function popSearchS(select, data) {
  console.log(data);
  // dbSearchEnable()
        select.remove(".newoptions");

  var length = select.children("option").length;
  console.log(length);
  if (length > 1){
  }
  var firstdrop = select;
  if (firstdrop === selectModel) {
    firstdrop.not(".newoptions");
    console.log("removr");
  }
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    var newSelect = $("<option></option").text(data[i]);
    newSelect.val(data[i]);
    newSelect.addClass("newoptions");
    newSelect.data(data[i]);
    newSelect.onclick = popNSeachI;
    firstdrop.append(newSelect);
  }
}
/////////////////////////////
var popNSeachI = function () {
  dbSearchEnable()
  var make = $(this).val();
  console.log(make)
  console.log(modelNames);
  callmake(make, function (make) {
    console.log(modelNames)
    popSearchS(selectModel, make);
    popSearchS(selectMin, price);
    popSearchS(selectMax, price);
    popSearchS(selectMaxY, years);
    popSearchS(selectMinY, years);
  });
}
/////////////////////////////
function callmake(make, cb) {
  console.log(make)
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
      console.log(modelNames);
    }
  })
}
/////////////////////////////

function populateResults(arr) {
  var resultbox = $(".resultsBox");
  resultbox.empty();
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].make)
    var item = $("<div></div");
    item.addClass("row boxstyle");
    var col1 = $("<div></div>").addClass("col data");
    var col2 = $("<div></div>").addClass("col img");
    var textMM = $("<p></p>").addClass("makemodel");
    var textP = $("<p></p>").addClass("price");
    var textdes = $("<p></p>").addClass("descriptS");
    var textkil = $("<p></p>").addClass("kiloS");
    var img = $("<img class ='imgStyle'>");
    img.attr("src", arr[i].img);
    textMM.append(arr[i].make + " : " + arr[i].model).text;
    textP.append(arr[i].price);
    textdes.append(arr[i].description);
    textkil.append(arr[i].kilometers);
    col2.append(img);
    col1.append(textMM, textP, textdes, textkil);
    // col1.append(item);
    item.append(col1, col2);
    resultbox.append(item);
    //item.append(resultbox);
  }

}
/////////////////////////////
var refreshData = function () {
  API.getAll().then(function (data) {
  })
};

/////////////////////////////
/////////////////////////////
var searchDatabase = function () {
  let search = {
    make: select1Make.val(),
    model: selectModel.val(),
    minY: parseInt(selectMinY.val()),
    maxY: parseInt(selectMaxY.val()),
    minP: parseInt(selectMin.val()),
    maxP: parseInt(selectMax.val())
  }
  if (search.minY > search.maxY || search.minP > search.maxP) {
    alert("Invalid Search");
  } else {
   let newSearch = '/' + search.make + '/' + search.model + '/' + search.minY + "/" + search.maxY + '/' + search.minP + "/" + search.maxP;
   console.log(newSearch)
    API.getSearch(newSearch).then(function (data) {
      console.log(JSON.stringify(data));
      populateResults(data);
    })
  }
};
////////////////////////////
function dbSearchEnable() {
  selectModel.prop("disabled", false)
  selectMinY.prop("disabled", false)
  selectMaxY.prop("disabled", false)
  selectMin.prop("disabled", false)
  selectMax.prop("disabled", false)
}
/////////////////////////////
$("#makeSelect1").on("change", optionMake, popNSeachI)
submitSearch.on("click", searchDatabase);

/* eslint-enable camelcase */