module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define("categorie", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { message: "Le nom catégorie ne peut être vide." },
                notEmpty: { message: "Le nom de catégorie ne peut être vide" }
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
    });

    return Categorie;
}