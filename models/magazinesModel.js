module.exports = (sequelize, DataTypes) => {
    const Magazine = sequelize.define("magazine", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { message: "Le nom magazine ne peut être vide." },
                notEmpty: { message: "Le nom magazine ne peut être vide" }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: "La description catégorie ne peut être vide." },
                notEmpty: { message: "Le description de catégorie ne peut être vide" }
            }
        },
        image: {
            type: DataTypes.STRING
        },
        presentation: {
            type: DataTypes.TEXT
        },
        urlDOc: {
            type: DataTypes.STRING
        }
    });

    return Magazine;
}