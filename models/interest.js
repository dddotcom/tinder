'use strict';
module.exports = function(sequelize, DataTypes) {
  var interest = sequelize.define('interest', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.interest.belongsToMany(models.user, {through: models.users_interests});
      }
    }
  });
  return interest;
};
