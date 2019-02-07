var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.vehicle.findAll({}).then(function (vehicleInfo) {
      res.render("index", {
        msg: "Welcome!",
        vehicle: vehicleInfo,
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.vehicle.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


  app.get("/register", function (req, res) {
    res.render("register")
  })

};