module.exports = (sequelize, DataTypes) => {
  const Properties = sequelize.define("Properties", {
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    postal: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["single-family", "studio", "condo", "plex", "cottage"],
      allowNull: false,
    },
    rooms: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    year_built: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    features: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    isAction: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  //   Properties.associate = (models) => {
  //     Properties.hasMany(models.User, {
  //       onDelete: "cascade",
  //       foreignKey: "brokerId",
  //     });
  //   };
  return Properties;
};
