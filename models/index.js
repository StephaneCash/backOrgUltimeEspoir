const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);
sequelize.authenticate()
    .then(() => {
        console.log("Connexion à la base de données a été effectuée avec succès");
    })
    .catch(err => {
        console.log(err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.categories = require("./categorieModel")(sequelize, DataTypes);
db.sousCategories = require("./sousCategorieModel")(sequelize, DataTypes);
db.articles = require("./articleModel")(sequelize, DataTypes);
db.images = require("./imageModel")(sequelize, DataTypes);
db.participants = require("./participantsModel")(sequelize, DataTypes);
db.dons = require("./donModel")(sequelize, DataTypes);
db.actualites = require("./actualitesModel")(sequelize, DataTypes);
db.categoriesMagazine = require("./categoriesMagazineModel")(sequelize, DataTypes);
db.magazines = require("./magazinesModel")(sequelize, DataTypes);
db.categoriesActus = require("./categoriesActus")(sequelize, DataTypes);
db.publications = require("./publicationModel")(sequelize, DataTypes);


// RELATION MAGAZINE et CATEGORIE 1-N
db.categoriesActus.hasMany(db.actualites, { as: 'actualites', });

db.actualites.belongsTo(db.categoriesActus, {
    foreignKey: "categorieActuId",
    as: 'categorie'
});

// RELATION MAGAZINE et CATEGORIE 1-N
db.categoriesMagazine.hasMany(db.magazines, { as: 'magazines', });

db.magazines.belongsTo(db.categoriesMagazine, {
    foreignKey: "categorieMagazineId",
    as: 'categorie'
});

db.documents = require("./document")(sequelize, DataTypes);
db.texts = require("./textSiteModel")(sequelize, DataTypes);

// RELATION 1-N CATEGORIE / SOUS CATEGORIE
db.categories.hasMany(db.sousCategories, { as: 'sousCategories', });

db.sousCategories.belongsTo(db.categories, {
    foreignKey: "categorieId",
    as: 'categorie'
});

// RELATION 1-N SOUS CATEGORIE / ARTICLE
db.sousCategories.hasMany(db.articles, { as: 'articles', });

db.articles.belongsTo(db.sousCategories, {
    foreignKey: "sousCategorieId",
    as: 'sousCategorie'
});

// RELATION N-N PARTICIPANT / DON

db.participants.hasMany(db.dons, { as: 'dons', });

db.dons.belongsTo(db.participants, {
    foreignKey: "participantId",
    as: 'participant'
});

// RELATION 1-N CAGNOTTES IMAGES
db.articles.hasMany(db.images, {
    as: "images",
});

db.images.belongsTo(db.articles, {
    foreignKey: "articleId",
    as: "article",
});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("DB SYNCHRONISEE AVEC SUCCES",)
    })
    .catch(err => {
        console.log("ERREURS DE SYNCHRONISATION DE BD : ", err);
    });

module.exports = db;
