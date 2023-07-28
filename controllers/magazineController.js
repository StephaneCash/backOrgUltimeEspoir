const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllmagazines = async (req, res) => {
    try {
        let magazines = await db.magazines.findAll({
            include: [{
                model: db.categoriesMagazine,
                as: "categorie"
            }]
        });
        res.status(200).json(magazines);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createMagazine = async (req, res) => {
    try {
        if (req.file) {
            const { nom, description, categorieMagazineId } = req.body;
            let newMagazine = await db.magazines.create({
                nom: nom,
                description: description,
                image: `api/${req.file.path}`,
                categorieMagazineId: categorieMagazineId
            });
            let findMag = await db.magazines.findByPk(newMagazine.id, {
                include: [{
                    model: db.categoriesMagazine,
                    as: "categorie"
                }]
            });
            res.status(201).json(findMag);
        } else {
            let newMagazine = await db.magazines.create(req.body);
            let findMag = await db.magazines.findByPk(newMagazine.id, {
                include: [{
                    model: db.categoriesMagazine,
                    as: "categorie"
                }]
            });
            res.status(201).json(findMag);
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

const getOneMagazine = async (req, res) => {
    try {
        let id = req.params.id;
        let MagazineFind = await db.magazines.findByPk(id);

        if (MagazineFind) {
            res.status(200).json({ message: "Magazine trouvé avec succès", data: MagazineFind });
        } else {
            res.status(404).json({ message: "Magazine non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const magazinesUpdated = async (req, res) => {
    try {
        let id = req.params.id;
        let findmagazines = await db.magazines.findByPk(id);

        if (findmagazines) {
            if (req.file) {
                const { nom, description, categorieMagazineId } = req.body;
                let updatemagazines = await findmagazines.update({
                    nom: nom,
                    description: description,
                    image: `api/${req.file.path}`,
                    categorieMagazineId: categorieMagazineId,
                }, {
                    where: { id: id }
                });
                if (updatemagazines) {
                    let findcat = await db.magazines.findByPk(id, {
                        include: [{
                            model: db.categoriesMagazine,
                            as: "categorie"
                        }]
                    });
                    res.status(200).json(findcat);
                }
            } else {
                let updatemagazines = await findmagazines.update(req.body, {
                    where: { id: id }
                });
                if (updatemagazines) {
                    let findcat = await db.magazines.findByPk(id, { include: [{
                        model: db.categoriesMagazine,
                        as: "categorie"
                    }]});
                    res.status(200).json(findcat);
                }
            }

        } else {
            res.status(404).json({ message: "Magazine non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const addPDF = async (req, res) => {
    try {
        let id = req.params.id;
        let findmagazines = await db.magazines.findByPk(id);

        if (findmagazines) {
            if (req.file) {
                let updatemagazines = await findmagazines.update({
                    urlDOc: `api/${req.file.path}`,
                }, {
                    where: { id: id }
                });
                if (updatemagazines) {
                    let findcat = await db.magazines.findByPk(id);
                    res.status(200).json(findcat);
                }
            } else {
                let updatemagazines = await findmagazines.update(req.body, {
                    where: { id: id }
                });
                if (updatemagazines) {
                    let findcat = await db.magazines.findByPk(id);
                    res.status(200).json(findcat);
                }
            }

        } else {
            res.status(404).json({ message: "Magazine non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteMagazine = async (req, res) => {
    try {
        let id = req.params.id;
        let findMagazine = await db.magazines.findByPk(id);

        if (findMagazine) {
            let catDeleted = await db.magazines.destroy({ where: { id: id } });
            if (catDeleted === 1) {
                res.status(200).json({ message: "Magazine a été suppriméé avec succès", data: findMagazine });
            }
        } else {
            res.status(404).json({ message: "Magazine non trouvéé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllmagazines,
    createMagazine,
    getOneMagazine,
    magazinesUpdated,
    deleteMagazine,
    addPDF
}

