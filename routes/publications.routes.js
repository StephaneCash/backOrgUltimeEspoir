const router = require("express").Router();
const publicationController = require("../controllers/publicationController");
const uploadPDF = require("../middleware/uploadPDF");
const upload = require("../middleware/uploadImage");

router.get("/", publicationController.getAllPublications);
router.post("/", upload, publicationController.createPub);

router.get("/:id", publicationController.getOnePub);
router.put("/:id", upload, publicationController.updatePub);
router.delete("/:id", publicationController.deletePub);

router.patch("/addPDF/:id", uploadPDF, publicationController.addPDF);

module.exports = router;