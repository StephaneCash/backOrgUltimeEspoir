module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Image;
}