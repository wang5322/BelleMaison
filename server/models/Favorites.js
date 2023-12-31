module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define("Favorites", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    property_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Properties",
        key: "id",
      },
    },
  });

  Favorites.associate = (models) => {
    Favorites.belongsTo(models.Users, {
      foreignKey: "user_id",
    });
    Favorites.belongsTo(models.Properties, {
      foreignKey: "property_id",
    });
  };

  return Favorites;
};
