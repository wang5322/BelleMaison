module.exports = (sequelize,DataTypes)=>{
    const Favorites = sequelize.define("Favorites",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
              },
        },
        property_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Properties',
                key: 'id',
              },
        },
        picture_url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        
    });

    Favorites.associate = (models) => {
        Pictures.belongsTo(models.Users, {
          foreignKey: 'user_id',
          as: 'user',
        });
    };
    
    Favorites.associate = (models) => {
        Pictures.belongsTo(models.Properties, {
          foreignKey: 'property_id',
          as: 'proerty',
        });
    };
    
    return Favorites;
};