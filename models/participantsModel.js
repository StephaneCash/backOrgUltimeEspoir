module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define("participant", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { message: "Le nom participant ne peut être vide." },
                notEmpty: { message: "Le nom de participant ne peut être vide" }
            }
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { message: "Le nrénom participant ne peut être vide." },
                notEmpty: { message: "Le prénom de participant ne peut être vide" }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        modePaiement: {
            type: DataTypes.STRING,
        },
        montant: {
            type: DataTypes.INTEGER,
        }
    });

    return Participant;
}