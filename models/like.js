'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    userId: DataTypes.INTEGER,
    userIdLiked: DataTypes.INTEGER,
    isSuperLike: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        models.like.belongsTo(models.user);
      }
    }
  });
  return like;
};
