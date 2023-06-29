const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllDocument = async (req, res) => {
    try {
        let documents = await db.documents.findAll();
        res.status(200).json(documents);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createDocument = async (req, res) => {
    console.log(req.body)
    try {
        let newDocument = await db.documents.create(req.body);
        res.status(201).json(newDocument);
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

const getOneDocument = async (req, res) => {
    try {
        let id = req.params.id;
        let DocumentFind = await db.documents.findOne({ where: { id: id } });

        if (DocumentFind) {
            res.status(200).json({ message: "Document trouvé avec succès", data: DocumentFind });
        } else {
            res.status(404).json({ message: "Document non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const DocumentUpdated = async (req, res) => {
    try {
        let id = req.params.id;
        let findDocument = await db.documents.findByPk(id);

        if (findDocument) {
            let updateDocument = await findDocument.update(req.body, {
                where: { id: id }
            });
            if (updateDocument) {
                let findcat = await db.documents.findByPk(id);
                res.status(200).json(findcat);
            }
        } else {
            res.status(404).json({ message: "Document non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteDocument = async (req, res) => {
    try {
        let id = req.params.id;
        let findDocument = await db.documents.findOne({ where: { id: id } });

        if (findDocument) {
            let catDeleted = await db.documents.destroy({ where: { id: id } });
            if (catDeleted === 1) {
                res.status(200).json({ message: "Document a été supprimé avec succès", data: findDocument });
            }
        } else {
            res.status(404).json({ message: "Document non trouvé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllDocument,
    createDocument,
    getOneDocument,
    DocumentUpdated,
    deleteDocument
}

