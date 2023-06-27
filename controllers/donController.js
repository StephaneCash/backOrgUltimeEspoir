const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllDons = async (req, res) => {
    try {
        let dons = await db.dons.findAll({
            include: [
                {
                    model: db.participants,
                    as: "participant"
                }
            ]
        });

        res.status(200).json(dons);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createDon = async (req, res) => {
    try {
        let newDon = await db.dons.create(req.body);
        res.status(201).json(newDon);
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

const getOneDon = async (req, res) => {
    try {
        let id = req.params.id;
        let donFind = await db.dons.findByPk(id, {
            include: [
                {
                    model: db.participants,
                    as: "participant"
                }
            ]
        });

        if (donFind) {
            res.status(200).json({ message: "Don trouvé avec succès", data: donFind });
        } else {
            res.status(404).json({ message: "Don non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updateDon = async (req, res) => {
    try {
        let id = req.params.id;
        let findDon = await db.dons.findByPk(id);

        if (findDon) {
            let donUpdate = await findDon.update(req.body, { where: { id: id } });
            if (donUpdate) {
                let findDon = await db.dons.findByPk(id, {
                    include: [
                        {
                            model: db.participants,
                            as: "participant"
                        }
                    ]
                });
                res.status(200).json(findDon);
            }
        }
        else {
            res.status(404).json({ message: "Don non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteDon = async (req, res) => {
    try {
        let id = req.params.id;
        let findDon = await db.dons.findByPk(id);

        if (findDon) {
            let donDel = await db.dons.destroy({ where: { id: id } });
            if (donDel === 1) {
                res.status(200).json(donDel);
            }
        } else {
            res.status(404).json({ message: "Don non trouvé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllDons,
    createDon,
    getOneDon,
    updateDon,
    deleteDon
}

