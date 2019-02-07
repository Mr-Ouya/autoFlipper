module.exports = function (sequelize, DataTypes) {


    var Accounts = sequelize.define("accounts", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },

        account: {
            type: DataTypes.STRING,
            null: false
        },

        password: {
            type: DataTypes.STRING,


        }

    });

    ;


    return Accounts


};