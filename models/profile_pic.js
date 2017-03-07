'use strict';
module.exports = function(sequelize, DataTypes) {
  var profile_pic = sequelize.define('profile_pic', {
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.profile_pic.belongsTo(models.user);
      }
    }
  });
  return profile_pic;
};
