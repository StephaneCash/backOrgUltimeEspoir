const router = require("express").Router();
const participantController = require("../controllers/participantController");
const upload = require('../middleware/uploadImage')

router.get("/", participantController.getAllParticipants);
router.post("/", upload, participantController.createParticipant);

router.get("/:id", participantController.getOneParticipant);
router.put("/:id", upload, participantController.updateParticipant);
router.delete("/:id", participantController.deleteParticipant);

module.exports = router;