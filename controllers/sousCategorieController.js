const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllSousCategories = async (req, res) => {
    try {
        let sousCategories = await db.sousCategories.findAll(
            {
                include: [
                    {
                        model: db.articles,
                        as: "articles"
                    },
                    {
                        model: db.categories,
                        as: "categorie"
                    },
                ]
            }
        );
        res.status(200).json(sousCategories);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createSousCategorie = async (req, res) => {
    try {
        let newSousCategories = await db.sousCategories.create(req.body);
        res.status(201).json(newSousCategories);
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else if (err instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else if (err instanceof ValidationErrorItem) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else {
            return res.status(500).json({ message: err })
        }
    }
};

const getOneSousCategorie = async (req, res) => {
    try {
        let id = req.params.id;
        let sousCategoriesFind = await db.sousCategories.findByPk(id);

        if (sousCategoriesFind) {
            res.status(200).json({ message: "Sous catégorie trouvée avec succès", data: sousCategoriesFind });
        } else {
            res.status(404).json({ message: "Sous catégorie non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const sousCategoriesUpdated = async (req, res) => {
    try {
        let id = req.params.id;
        let findSousCategories = await db.sousCategories.findByPk(id);

        if (findSousCategories) {
            let updateSousCategories = await findSousCategories.update(req.body, {
                where: { id: id }
            });
            if (updateSousCategories) {
                let findcat = await db.sousCategories.findByPk(id, {
                    include: [{ model: db.articles, as: "articles" }, {
                        model: db.categories,
                        as: "categorie"
                    },]
                });
                res.status(200).json(findcat);
            }
        } else {
            res.status(404).json({ message: "Sous catégorie non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteSousCategories = async (req, res) => {
    try {
        let id = req.params.id;
        let findSousCategories = await db.sousCategories.findOne({ where: { id: id } });

        if (findSousCategories) {
            let catDeleted = await db.sousCategories.destroy({ where: { id: id } });
            if (catDeleted === 1) {
                res.status(200).json({ message: "Sous catégorie a été supprimée avec succès", data: findSousCategories });
            }
        } else {
            res.status(404).json({ message: "Sous catégorie non trouvée avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllSousCategories,
    createSousCategorie,
    getOneSousCategorie,
    sousCategoriesUpdated,
    deleteSousCategories
}

