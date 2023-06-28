module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define("articles", {
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

    return Article;
}