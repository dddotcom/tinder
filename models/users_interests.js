'use strict';
module.exports = function(sequelize, DataTypes) {
  var users_interests = sequelize.define('users_interests', {
    userId: DataTypes.INTEGER,
    interestId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users_interests;
};