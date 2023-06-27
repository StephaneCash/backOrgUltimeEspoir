module.exports = (sequelize, DataTypes) => {
    const Don = sequelize.define('don', {
        montant: DataTypes.STRING,
        description: DataTypes.STRING
    })
    return Don;
};