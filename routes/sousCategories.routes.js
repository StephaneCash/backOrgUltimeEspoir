const router = require("express").Router();
const sousCategorieController = require("../controllers/sousCategorieController");

router.get("/", sousCategorieController.getAllSousCategories);
router.post("/", sousCategorieController.createSousCategorie);

router.get("/:id", sousCategorieController.getOneSousCategorie);
router.put("/:id", sousCategorieController.sousCategoriesUpdated);
router.delete("/:id", sousCategorieController.deleteSousCategories);

module.exports = router;