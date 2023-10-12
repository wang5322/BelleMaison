module.exports = (sequelize, DataTypes) => {
  const Properties = sequelize.define("Properties", {
    broker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
      type: DataTypes.INTEGER(4),
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
    isActive: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    lotArea: {
      type: DataTypes.INTEGER(40),
      allowNull: false,
    },
    parking: {
      type: DataTypes.TINYINT(2),
      allowNull: false,
    },
  });

  Properties.associate = (models) => {
    Properties.belongsTo(models.Users, {
      foreignKey: "broker_id",
      as: "user",
    });
    Properties.hasMany(models.Favorites, {
      foreignKey: "property_id",
    });
    Properties.hasMany(models.Pictures, {
      foreignKey: "property_id",
    });
  };

  return Properties;
};
