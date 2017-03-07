'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    school: DataTypes.STRING,
    work: DataTypes.STRING,
    about: DataTypes.TEXT,
    animalId: DataTypes.INTEGER,
    interestedIn: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, callback){
        // if(createdUser && createdUser.password){
          var hash = bcrypt.hashSync(createdUser.password, 10);
          createdUser.password = hash;
        // }
        callback(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.chat);
        models.user.hasMany(models.like);
        models.user.hasMany(models.dislike);
        models.user.hasMany(models.profile_pic);
        models.user.belongsToMany(models.interest, {through: models.users_interests});
      }
    },
    instanceMethods: {
      isValidPassword: function(passwordPlaintext){
        return bcrypt.compareSync(passwordPlaintext, this.password);
      },
      toJSON: function(){
        var data = this.get();
        delete data.password;
        return data;
      }
    }
  });
  return user;
};
