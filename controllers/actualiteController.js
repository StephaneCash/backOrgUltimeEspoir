const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllActualites = async (req, res) => {
    try {
        let actualites = await db.actualites.findAll();
        res.status(200).json(actualites);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createActualite = async (req, res) => {
    try {
        if (req.file) {
            const { nom, description, } = req.body;
            let newActualite = await db.actualites.create({
                nom: nom,
                description: description,
                url: `api/${req.file.path}`
            });
            res.status(201).json(newActualite);
        } else {
            let newActualite = await db.actualites.create(req.body);
            res.status(201).json(newActualite);
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

const getOneActualite = async (req, res) => {
    try {
        let id = req.params.id;
        let actualiteFind = await db.actualites.findByPk(id);

        if (actualiteFind) {
            res.status(200).json({ message: "Actualité trouvée avec succès", data: actualiteFind });
        } else {
            res.status(404).json({ message: "Actualité non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const actualitesUpdated = async (req, res) => {
    try {
        let id = req.params.id;
        let findactualites = await db.actualites.findByPk(id);

        if (findactualites) {
            if (req.file) {
                const { nom, description, } = req.body;
                let updateactualites = await findactualites.update({
                    nom: nom,
                    description: description,
                    url: `api/${req.file.path}`
                }, {
                    where: { id: id }
                });
                if (updateactualites) {
                    let findcat = await db.actualites.findByPk(id);
                    res.status(200).json(findcat);
                }
            } else {
                let updateactualites = await findactualites.update(req.body, {
                    where: { id: id }
                });
                if (updateactualites) {
                    let findcat = await db.actualites.findByPk(id);
                    res.status(200).json(findcat);
                }
            }

        } else {
            res.status(404).json({ message: "Actualite non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteActualite = async (req, res) => {
    try {
        let id = req.params.id;
        let findactualite = await db.actualites.findByPk(id);

        if (findactualite) {
            let catDeleted = await db.actualites.destroy({ where: { id: id } });
            if (catDeleted === 1) {
                res.status(200).json({ message: "Actualité a été suppriméé avec succès", data: findactualite });
            }
        } else {
            res.status(404).json({ message: "Actualité non trouvéé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllActualites,
    createActualite,
    getOneActualite,
    actualitesUpdated,
    deleteActualite
}

