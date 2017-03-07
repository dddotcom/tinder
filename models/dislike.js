'use strict';
module.exports = function(sequelize, DataTypes) {
  var dislike = sequelize.define('dislike', {
    userId: DataTypes.INTEGER,
    userIdDisliked: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.dislike.belongsTo(models.user);
      }
    }
  });
  return dislike;
};
