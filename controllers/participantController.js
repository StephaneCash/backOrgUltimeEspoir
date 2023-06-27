const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllParticipants = async (req, res) => {
    try {
        let listParticpants = await db.participants.findAll();
        res.status(200).json(listParticpants);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createParticipant = async (req, res) => {
    try {
        const { participantId, cagnotteId } = req.body;
        let newParticipant = await db.participants.create(req.body);
        await db.participant_cagnotte(cagnotteId, participantId);
        res.status(201).json(newParticipant);
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
            return res.status(500).json({ message: err });
        }
    }
};

const getOneParticipant = async (req, res) => {
    try {
        let id = req.params.id;
        let participantFind = await db.participants.findOne({ where: { id: id } });

        if (participantFind) {
            res.status(200).json({ message: "Participant trouvé avec succès", data: participantFind });
        } else {
            res.status(404).json({ message: "Participant non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updateParticipant = async (req, res) => {
    try {
        let id = req.params.id;
        let findParticipant = await db.participants.findOne({ where: { id: id } });

        if (findParticipant) {
            let participantUpdate = await findParticipant.update(req.body, {
                where: { id: id }
            });
            if (participantUpdate) {
                let findParticipantInAll = await db.participants.findOne({ where: { id: id } });
                res.status(200).json(findParticipantInAll);
            }
        } else {
            res.status(404).json({ message: "Participant non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteParticipant = async (req, res) => {
    try {
        let id = req.params.id;
        let findParticipant = await db.participants.findOne({ where: { id: id } });

        if (findParticipant) {
            let participantDeleted = await db.Participants.destroy({ where: { id: id } });
            if (participantDeleted === 1) {
                res.status(200).json(findParticipant);
            }
        } else {
            res.status(404).json({ message: "Participant non trouvé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};



module.exports = {
    getAllParticipants,
    createParticipant,
    getOneParticipant,
    updateParticipant,
    deleteParticipant,
}

