module.exports = (sequelize, DataTypes) => {
  const Pictures = sequelize.define("Pictures", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Properties",
        key: "id",
      },
    },
    picture_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });

  Pictures.associate = (models) => {
    Pictures.belongsTo(models.Properties, {
      foreignKey: "property_id",
    });
  };

  return Pictures;
};
