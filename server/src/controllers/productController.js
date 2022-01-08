const slugify = require("slugify");
const shortid = require("shortid");
const Product = require("../models/product");

exports.addProduct = (req, res) => {
  // res.status(200).json({"files": req.files,"body":req.body})
  const { name, price, description, quantity, category } = req.body;

  productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const _product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    quantity,
    category,
    productPictures,
    createdBy: req.user._id,
  });
  console.log(_product);
  _product.save((err, data) => {
    if (err)
      res.status(500).json({ message: "something went wrong", err: err });

    if (data) {
      res.status(201).json(data);
    }
  });
};

exports.deleteProduct = (req, res) => {
  console.log(req.body)
 Product.findOneAndDelete( { _id:req.body.id},(err,data)=>{
   if(err) res.status(500).json({err});
   else 
   if(data) res.status(200).json(data);
 } )
};
