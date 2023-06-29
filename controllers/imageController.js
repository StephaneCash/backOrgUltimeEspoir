const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllImages = async (req, res) => {
    try {
        let images = await db.images.findAll({
            include: [{
                model: db.articles,
                as: "article"
            }]
        });
        res.status(200).json(images);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createImage = async (req, res) => {
    try {
        const { articleId, nom, description } = req.body;
        if (req.files) {
            let newImage = await db.images.create({
                articleId: articleId,
                url: `api/${req.files[0].path}`,
                description: description,
                nom: nom
            });
            res.status(201).json(newImage)
        } else {
            let newImage = await db.images.create({
                articleId: articleId,
                description: description,
                nom: nom
            });
            res.status(201).json(newImage)
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

const getOneImage = async (req, res) => {
    try {
        let id = req.params.id;
        let imageFind = await db.images.findOne({ where: { id: id } });

        if (imageFind) {
            res.status(200).json({ message: "Image trouvée avec succès", data: imageFind });
        } else {
            res.status(404).json({ message: "Image non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updateImage = async (req, res) => {
    try {
        let id = req.params.id;
        let findImage = await db.images.findOne({ where: { id: id } });
        const { nom, description, articleId } = req.body;
        if (req.files) {
            if (findImage) {
                let imageUpdate = await findImage.update({
                    nom: nom,
                    description: description,
                    articleId: articleId,
                    url: `api/${req.files[0].path}`
                }, {
                    where: { id: id }
                });
                if (imageUpdate) {
                    let findImage = await db.images.findOne({ where: { id: id } });
                    res.status(200).json({ message: "Image a été modifiée avec succès", data: findImage });
                }
            } else {
                res.status(404).json({ message: "Image non trouvée avec l'id : " + id });
            }
        } else {
            if (findImage) {
                let imageUpdate = await findImage.update({
                    nom: nom,
                    description: description,
                    articleId: articleId,
                }, {
                    where: { id: id }
                });
                if (imageUpdate) {
                    let findImage = await db.images.findOne({ where: { id: id } });
                    res.status(200).json({ message: "Image a été modifiée avec succès", data: findImage });
                }
            } else {
                res.status(404).json({ message: "Image non trouvée avec l'id : " + id });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteImage = async (req, res) => {
    try {
        let id = req.params.id;
        let findImage = await db.images.findOne({ where: { id: id } });

        if (findImage) {
            let imageDeleted = await db.images.destroy({ where: { id: id } });
            if (imageDeleted === 1) {
                res.status(200).json({ message: "Image a été supprimée avec succès", data: findImage });
            }
        } else {
            res.status(404).json({ message: "Image non trouvée avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllImages,
    createImage,
    getOneImage,
    updateImage,
    deleteImage
}

