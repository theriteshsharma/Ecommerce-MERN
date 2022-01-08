const express = require("express");
const {
  createCategory,
  getCategory,
  deleteCategories
} = require("../controllers/categoryController");
const { requiresignin, adminMiddleware } = require("../middleware/common");
const router = express.Router();
const multer = require("multer");
const Path = require("path");
const shortid = require("shortid");

// multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, Path.join(Path.dirname(__dirname), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-category-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requiresignin,
  adminMiddleware,
  upload.single("categoryImage"),
  createCategory
);
router.get("/category", getCategory);
router.post("/category/delete",requiresignin,adminMiddleware, deleteCategories);


module.exports = router;
