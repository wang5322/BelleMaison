module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(360),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postal: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    role: {
      //admin, buyer, broker
      type: DataTypes.ENUM("admin", "buyer", "broker"),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    broker_approval: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    broker_licence_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Properties, {
      foreignKey: "broker_id",
    });
    Users.hasMany(models.Favorites, {
      foreignKey: "user_id",
    });
  };

  return Users;
};
