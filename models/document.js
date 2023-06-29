module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define("document", {
        nom: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
    });

    return Document;
}