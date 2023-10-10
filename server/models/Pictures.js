module.exports = (sequelize, DataTypes) => {
  const Pictures = sequelize.define("Pictures", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    property_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Properties",
        key: "id",
      },
      allowNull: true,
    },
    broker_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: true,
    },
    isCertificate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
  });

  Pictures.associate = (models) => {
    Pictures.belongsTo(models.Properties, {
      foreignKey: "property_id",
    });
    Pictures.belongsTo(models.Users, {
      foreignKey: "broker_id",
    });
  };

  return Pictures;
};
