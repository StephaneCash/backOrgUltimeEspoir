const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllPublications = async (req, res) => {
    try {
        let publications = await db.publications.findAll();
        res.status(200).json(publications);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createPub = async (req, res) => {
    try {
        if (req.file) {
            const { nom, description } = req.body;
            let newPub = await db.publications.create({
                nom: nom,
                description: description,
                url: `api/${req.file.path}`,
            });
            res.status(201).json(newPub);
        } else {
            let newPub = await db.publications.create(req.body);
            res.status(201).json(newPub);
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

const getOnePub = async (req, res) => {
    try {
        let id = req.params.id;
        let findPub = await db.publications.findByPk(id);

        if (findPub) {
            res.status(200).json({ message: "Pub trouvée avec succès", data: findPub });
        } else {
            res.status(404).json({ message: "Magazine non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updatePub = async (req, res) => {
    try {
        let id = req.params.id;
        let findPub = await db.publications.findByPk(id);

        if (findPub) {
            if (req.file) {
                const { nom, description } = req.body;
                let updatepublication = await findPub.update({
                    nom: nom,
                    description: description,
                    url: `api/${req.file.path}`,
                }, {
                    where: { id: id }
                });
                if (updatepublication) {
                    let findPublication = await db.publications.findByPk(id);
                    res.status(200).json(findPublication);
                }
            } else {
                let updatePub = await findPub.update(req.body, {
                    where: { id: id }
                });
                if (updatePub) {
                    let findPublication = await db.publications.findByPk(id);
                    res.status(200).json(findPublication);
                }
            }
        } else {
            res.status(404).json({ message: "Publication non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const addPDF = async (req, res) => {
    try {
        let id = req.params.id;
        let findPub = await db.publications.findByPk(id);

        if (findPub) {
            if (req.file) {
                let updatePub = await findPub.update({
                    urlPDF: `api/${req.file.path}`,
                }, {
                    where: { id: id }
                });
                if (updatePub) {
                    let findcat = await db.publications.findByPk(id);
                    res.status(200).json(findcat);
                }
            }

        } else {
            res.status(404).json({ message: "Pub non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deletePub = async (req, res) => {
    try {
        let id = req.params.id;
        let findPub = await db.publications.findByPk(id);

        if (findPub) {
            let pubDeleted = await db.publications.destroy({ where: { id: id } });
            if (pubDeleted === 1) {
                res.status(200).json({ message: "Pub a été suppriméé avec succès", data: findPub });
            }
        } else {
            res.status(404).json({ message: "Pub non trouvéé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllPublications,
    createPub,
    getOnePub,
    updatePub,
    deletePub,
    addPDF
}

