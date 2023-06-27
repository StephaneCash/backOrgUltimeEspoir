const router = require("express").Router();
const imageController = require("../controllers/imageController");
const uploadImages = require("../middleware/uploadImages");

router.get("/", imageController.getAllImages);
router.post("/", uploadImages, imageController.createImage);

router.get("/:id", imageController.getOneImage);
router.put("/:id", uploadImages, imageController.updateImage);
router.delete("/:id", imageController.deleteImage);

module.exports = router;