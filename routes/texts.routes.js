const router = require("express").Router();
const text = require("../controllers/textController");

router.get("/", text.getAllText);
router.post("/", text.createtext);

router.get("/:id", text.getOnetext);
router.put("/:id", text.textUpdated);
router.delete("/:id", text.deleteText);

module.exports = router;