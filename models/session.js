const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Session extends Model {};

Session.init({
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: DataTypes.STRING, // Adjust according to your session store schema
    expires: DataTypes.DATE,
    data: DataTypes.TEXT
  }, {
    sequelize,
    timestamps: false,
});

module.exports =  Session