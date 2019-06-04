var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var bcrypt = require("bcrypt");
module.exports = function (app) {
  // Get all examples
  app.get("/autoflipper/api/vehicle/all", function (req, res) {
    db.vehicle.findAll({}).then(function (allVehicle) {
      res.json(allVehicle);
    });
  });
  app.get("/autoflipper/api/vehicle/:make/:model/:yearmin/:yearmax/:pricemin/:pricemax", function (req, res) {
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
    if (whereClause.length == 0) {
        console.log(data);
      console.log("hi")
      res.status(404).json(data);
    
    }else{
        console.log(whereClause);
    db.vehicle.findAll({
      where: whereClause
    }).then(function (data) {
      console.log(data);
      res.json(data)
    });

    }
  
  })



  // Create a new example
  app.post("/autoflipper/api/vehicle", function (req, res) {
    db.vehicle.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/autoflipper/api/vehicle/:id", function (req, res) {
    db.vehicle.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/autoflipper/new_account", function (req, res) {
    var saltRounds = 10;
    console.log(req.body);
    bcrypt.genSalt(saltRounds, function (err, salt) {
      console.log(req.body.password);
      if (err) throw err

      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) throw err;
        var newaccount = {
          username: req.body.username,
          email: req.body.email,
          password: hash
        }
        db.accounts.create(newaccount).then(function (data) {
          res.redirect("/accountlogin")
        })
      })
    })
  })
  app.post('/autoflipper/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {
      db.accounts.findAll({
        where: {
          username: username,
          // password: password
        }
      }).then(function (results) {
        if (!results) {
          res.send('No User Exist');
        } else {
          bcrypt.compare(password, results[0].dataValues.password, function (err, results) {
            if (err) throw err;
            if (results == true) {
              request.session.loggedin = true;
              request.session.username = username;
              response.redirect('/autoflipper');

            } else {
              response.send("Incorrect Password or Username");
            }



          })

        }
      })
    }
  });

};