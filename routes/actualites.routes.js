const router = require("express").Router();
const actualiteController = require("../controllers/actualiteController");
const upload = require("../middleware/uploadImage");

router.get("/", actualiteController.getAllActualites);
router.post("/", upload, actualiteController.createActualite);

router.get("/:id", actualiteController.getOneActualite);
router.put("/:id", upload, actualiteController.actualitesUpdated);
router.delete("/:id", actualiteController.deleteActualite);

module.exports = router;