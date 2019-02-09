var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/vehicle", function (req, res) {
    db.vehicle.findAll({}).then(function (allVehicle) {
      res.json(allVehicle);
    });
  });
  app.get("/api/vehicle/:make", function (req, res) {

    var model = req.params.make;

    db.vehicle.findAll({

      where: {

        model: model

      }
    }).then(function (listmake) {
      res.json(listmake);


    });
  });
  app.get("api/vehicle/:make/:model/yearmin/yearmax/pricemin/pricemax", function (req, res) {

    db.vehicle.findAll({
      where: {

        model: model,
        make: make
      }
    }).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });


  // Create a new example
  app.post("/api/vehicle", function (req, res) {
    db.vehicle.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/vehicle/:id", function (req, res) {
    db.vehicle.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/new_account", function (req, res) {


  })
};