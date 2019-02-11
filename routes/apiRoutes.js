var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

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
  app.get("/api/vehicle/:make/:model/:yearmin/:yearmax/:pricemin/:pricemax", function (req, res) {
    console.log(req.params + "hello")
    //console.log(req.body);


    db.vehicle.findAll({

      where: {
        model: req.params.model,
        make: req.params.make,
        year: {
          [Op.between]: [req.params.yearmin, req.params.yearmax]
        },
        price: {
          [Op.between]: [req.params.pricemin, req.params.pricemax]
        }

      }

    }).then(function (data) {
      res.json(data);
      console.log(data);
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