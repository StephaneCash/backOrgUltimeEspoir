const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllText = async (req, res) => {
    try {
        let texts = await db.texts.findAll();
        res.status(200).json(texts);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createtext = async (req, res) => {
    try {
        let newtext = await db.texts.create(req.body);
        res.status(201).json(newtext);
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

const getOnetext = async (req, res) => {
    try {
        let id = req.params.id;
        let textFind = await db.texts.findOne({ where: { id: id } });

        if (textFind) {
            res.status(200).json({ message: "text trouvé avec succès", data: textFind });
        } else {
            res.status(404).json({ message: "text non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const textUpdated = async (req, res) => {
    try {
        let id = req.params.id;
        let findtext = await db.texts.findByPk(id);

        if (findtext) {
            let updatetext = await findtext.update(req.body, {
                where: { id: id }
            });
            if (updatetext) {
                let findcat = await db.texts.findByPk(id);
                res.status(200).json(findcat);
            }
        } else {
            res.status(404).json({ message: "text non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteText = async (req, res) => {
    try {
        let id = req.params.id;
        let findtext = await db.texts.findOne({ where: { id: id } });

        if (findtext) {
            let catDeleted = await db.texts.destroy({ where: { id: id } });
            if (catDeleted === 1) {
                res.status(200).json({ message: "text a été supprimé avec succès", data: findtext });
            }
        } else {
            res.status(404).json({ message: "text non trouvé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllText,
    createtext,
    getOnetext,
    textUpdated,
    deleteText
}

