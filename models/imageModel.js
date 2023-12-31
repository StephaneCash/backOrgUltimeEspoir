module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nom: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
    });

    return Image;
}