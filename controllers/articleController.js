const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllArticles = async (req, res) => {
    try {
        let articles = await db.articles.findAll(
            {
                include: [
                    {
                        model: db.sousCategories,
                        as: "sousCategorie"
                    },
                ]
            }
        );
        res.status(200).json(articles);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createArticle = async (req, res) => {
    try {
        if (req.file) {
            const { nom, description, } = req.body;
            let newarticle = await db.articles.create({
                nom: nom,
                description: description,
                url: `api/${req.file.path}`
            });
            res.status(201).json(newarticle);
        } else {
            let newarticle = await db.articles.create(req.body);
            res.status(201).json(newarticle);
        }
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

const getOneArticle = async (req, res) => {
    try {
        let id = req.params.id;
        let articlesFind = await db.articles.findByPk(id);

        if (articlesFind) {
            res.status(200).json({ message: "Article trouvé avec succès", data: articlesFind });
        } else {
            res.status(404).json({ message: "Article non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const articlesUpdated = async (req, res) => {
    try {
        let id = req.params.id;
        let findarticles = await db.articles.findByPk(id);

        if (findarticles) {
            if (req.file) {
                const { nom, description, } = req.body;
                let updatearticles = await findarticles.update({
                    nom: nom,
                    description: description,
                    url: `api/${req.file.path}`
                }, {
                    where: { id: id }
                });
                if (updatearticles) {
                    let findcat = await db.articles.findByPk(id, { include: [{ model: db.sousCategories, as: "sousCategorie" }] });
                    res.status(200).json(findcat);
                }
            } else {
                let updatearticles = await findarticles.update(req.body, {
                    where: { id: id }
                });
                if (updatearticles) {
                    let findcat = await db.articles.findByPk(id, { include: [{ model: db.sousCategories, as: "sousCategorie" }] });
                    res.status(200).json(findcat);
                }
            }

        } else {
            res.status(404).json({ message: "Article non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteArticle = async (req, res) => {
    try {
        let id = req.params.id;
        let findarticles = await db.articles.findByPk(id);

        if (findarticles) {
            let catDeleted = await db.articles.destroy({ where: { id: id } });
            if (catDeleted === 1) {
                res.status(200).json({ message: "Article a été supprimé avec succès", data: findarticles });
            }
        } else {
            res.status(404).json({ message: "Article non trouvé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllArticles,
    createArticle,
    getOneArticle,
    articlesUpdated,
    deleteArticle
}

