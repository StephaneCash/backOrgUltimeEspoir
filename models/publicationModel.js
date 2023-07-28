module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define("publication", {
        nom: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.STRING,
        },
        urlPDF: {
            type: DataTypes.STRING,
        },
    });

    return Publication;
}