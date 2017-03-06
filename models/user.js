'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    school: DataTypes.STRING,
    work: DataTypes.STRING,
    about: DataTypes.TEXT,
    animalId: DataTypes.INTEGER,
    interestedIn: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.chat);
        models.user.hasMany(models.like);
        models.user.hasMany(models.dislike);
        models.user.hasMany(models.profile_pic);
        models.user.belongsToMany(models.interest, {through: models.users_interests});
      }
    }
  });
  return user;
};
