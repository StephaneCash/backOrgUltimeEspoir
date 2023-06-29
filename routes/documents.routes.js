const router = require("express").Router();
const documentController = require("../controllers/docummentController");

router.get("/", documentController.getAllDocument);
router.post("/", documentController.createDocument);

router.get("/:id", documentController.getOneDocument);
router.put("/:id", documentController.DocumentUpdated);
router.delete("/:id", documentController.deleteDocument);

module.exports = router;