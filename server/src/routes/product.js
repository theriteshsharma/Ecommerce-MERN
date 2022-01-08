const express = require("express");
const { addProduct, deleteProduct } = require("../controllers/productController");
const { requiresignin, adminMiddleware } = require("../middleware/common");
const router = express.Router();
const multer = require("multer");
const Path = require("path");
const shortid = require("shortid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, Path.join(Path.dirname(__dirname), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/product/create",
  requiresignin,
  adminMiddleware,
  upload.array("productPictures"),
  addProduct
);

router.post("/product/delete",requiresignin,adminMiddleware,deleteProduct);

module.exports = router;
