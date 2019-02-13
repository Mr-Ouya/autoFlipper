var db = require("../models");
var session = require("express-session");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.vehicle.findAll({}).then(function (vehicleInfo) {
      res.render("index", {
        msg: "Welcome!",
        vehicle: vehicleInfo,
      });
    })
  })

  app.get("/autoflipper/accountlogin", function (req, res) {
    res.render("login", {
      msg: "Login into Your Account"
    });
  });
  // Load example page and pass in an example by id

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  app.get("/register", function (req, res) {
    res.render("register")
  })






};