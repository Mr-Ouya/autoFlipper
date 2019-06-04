module.exports = function (sequelize, DataTypes) {

  var Vehicle = sequelize.define("vehicle", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },
    vehicle: {
      type: DataTypes.STRING,
      null: false
    },
    make: {
      type: DataTypes.STRING,
      null: false
    },
    model: {
      type: DataTypes.STRING,
      null: false
    },
    price: {
      type: DataTypes.INTEGER(8),
      null: false
    },
    description: {
      type: DataTypes.TEXT,
    },

    year: {
      type: DataTypes.INTEGER(4),
      null: false
    },
    img: {
      type: DataTypes.BLOB,

    },
    kilometers: {
      type: DataTypes.INTEGER(225)
    }



  });

  return Vehicle;


};