module.exports = (sequelize, DataTypes) => {
    const TextSite = sequelize.define("text", {
        nom: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
    });

    return TextSite;
}