'use strict';
module.exports = function(sequelize, DataTypes) {
  var animal = sequelize.define('animal', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return animal;
};