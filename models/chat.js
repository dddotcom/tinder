'use strict';
module.exports = function(sequelize, DataTypes) {
  var chat = sequelize.define('chat', {
    userId: DataTypes.INTEGER,
    userIdTo: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.chat.belongsTo(models.user);
      }
    }
  });
  return chat;
};
