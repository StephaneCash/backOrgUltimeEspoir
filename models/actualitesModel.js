module.exports = (sequelize, DataTypes) => {
    const Actualites = sequelize.define("actualite", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING
        }
    });

    return Actualites;
}