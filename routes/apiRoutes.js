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
    console.log(req.params)
    //console.log(req.body);
    var yearA;
    var yearB;
    var priceA;
    var priceB;
    let whereClause = {

    }
    console.log(yearA, yearB, priceA, priceB)

    //Check if Make has been selected 
    if (req.params.make === "Make") {
      res.status(404).json({
        error: 'Make has not been selected'
      })
    } else {

      whereClause.make = req.params.make;
      // return whereClause.model;

    }
    ///////////////////
    if (req.params.model === "Model") {} else {
      whereClause.model = req.params.model;

      //return whereClause.model;
    }
    /////////////////////



    if (isNaN(req.params.yearmin)) {
      yearA = 2000;
      if (isNaN(req.params.yearmax)) {
        yearB = 2019
        console.log(yearB)
        whereClause.year = {

          [Op.between]: [yearA, yearB]
        }
      } else {
        yearB = req.params.yearmax;
        whereClause.year = {

          [Op.between]: [yearA, yearB]
        }
        //return whereClause.model;
      };
    } else {
      yearA = req.params.yearmin;
      if (isNaN(req.params.yearmax)) {
        YearB = 2019
        whereClause.year = {

          [Op.between]: [yearA, yearB]
        }
      } else {
        yearB = req.params.yearmax;
        whereClause.year = {

          [Op.between]: [yearA, yearB]
        }
        //return whereClause.model;
      }
      //return whereClause.model;
    };


    if (isNaN(req.params.pricemin)) {
      // whereClause.pricemin = 0;
      priceA = 0;
      if (isNaN(req.params.pricemax)) {
        priceB = 200000
        whereClause.price = {

          [Op.between]: [priceA, priceB]
        }
      } else {
        priceB = req.params.pricemax;
        whereClause.price = {

          [Op.between]: [priceA, priceB]
        }
      };
    } else {
      priceA = req.params.pricemin;
      if (isNaN(req.params.pricemax)) {
        priceB = 200000
        whereClause.price = {

          [Op.between]: [priceA, priceB]
        }
      } else {
        priceB = req.params.pricemax;
        whereClause.price = {

          [Op.between]: [priceA, priceB]
        }

      }
    };



    //console.log(whereClause, +"    " + yearA, +"    " + yearB, +"    " + priceA, +"    " + priceB)

    // whereClause.year = {
    //   [Op.between]: [req.params.yearmin, req.params.yearmax]
    // }


    if (whereClause.length == 0) {
      res.status(404).json(data);
      console.log(data);
    }
    console.log(whereClause);
    db.vehicle.findAll({
      where: whereClause
      /*year: {
        [Op.between]: [yearA, yearB]
      },
      price: {
        [Op.between]: [priceA, priceB]
      }
      */

      //   [Op.between]: [yearA, yearB],
      // [Op.between]: [priceA, priceB]

      // where: {
      //   model: req.params.model,
      //   make: req.params.make,
      //   year: {
      //     [Op.between]: [req.params.yearmin, req.params.yearmax]
      //   },
      //   price: {
      //     [Op.between]: [req.params.pricemin, req.params.pricemax]
      //   }

      // }

    }).then(function (data) {
      res.json(data)
    });

  })



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

  app.post("/new_account", function (req, res) {




  })
  app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
      db.accounts.findAll({
        where: {
          username: username,
          password: password
        }
      }).then(function (results) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/');
        } else {
          response.send('Incorrect Username and/or Password!');
        }
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  });


}