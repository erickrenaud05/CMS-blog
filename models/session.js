const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Session extends Model {};

Session.init({
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT
  }, {
    sequelize,
    timestamps: false,
});

module.exports =  Session