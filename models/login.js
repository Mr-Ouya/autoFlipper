module.exports = function (sequelize, DataTypes) {


    var Accounts = sequelize.define("accounts", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },

        username: {
            type: DataTypes.STRING(50),
            null: false
        },

        password: {
            type: DataTypes.STRING(255),
            null: false


        },
        email: {
            type: DataTypes.STRING(100),
            null: false
        }

    });

    ;


    return Accounts


};