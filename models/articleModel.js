module.exports = (sequelize, DataTypes) => {
    const Temoignages = sequelize.define("temoignages", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return Temoignages;
}