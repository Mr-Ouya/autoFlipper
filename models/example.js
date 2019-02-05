module.exports = function(sequelize, DataTypes) {
  var Cars = sequelize.define("Cars", {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    modelYear: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    kilometers: DataTypes.INTEGER
  });
  return Cars;
};
