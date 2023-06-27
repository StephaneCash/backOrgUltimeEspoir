const router = require("express").Router();
const donController = require("../controllers/donController");

router.get("/", donController.getAllDons);
router.post("/", donController.createDon);

router.get("/:id", donController.getOneDon);
router.put("/:id", donController.updateDon);
router.delete("/:id", donController.deleteDon);

module.exports = router;