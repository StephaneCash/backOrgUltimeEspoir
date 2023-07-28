const router = require("express").Router();
const magazineController = require("../controllers/magazineController");
const upload = require("../middleware/uploadImage");
const uploadPDF = require("../middleware/uploadPDF");

router.get("/", magazineController.getAllmagazines);
router.post("/", upload, magazineController.createMagazine);

router.get("/:id", magazineController.getOneMagazine);
router.put("/:id", upload, magazineController.magazinesUpdated);
router.delete("/:id", magazineController.deleteMagazine);

router.patch("/addPDF/:id", uploadPDF, magazineController.addPDF);

module.exports = router;