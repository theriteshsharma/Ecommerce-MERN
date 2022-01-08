const Cart = require("../models/cart");
const product = require("../models/product");

exports.addtocart = (req, res) => {
  console.log("in add  to cart");
  console.log(req.user._id);
  Cart.findOne({ user: req.user._id }).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    if (data) {
      console.log("cart was found");

      const product = req.body.cartItems.product;
      const item = data.cartItems.find((c) => c.product == product);

      console.log(item);

      let condition, update;
      if (item) {
        console.log("item already exists");

        condition = { user: req.user._id ,"cartItems.product": product};
        update = {
          "$set": {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        console.log("item does not exits");

        condition = { user: req.user._id };
        update = {
          "$push": {
            "cartItems": req.body.cartItems,
          },
        };
      }

      const test = Cart.findOne(condition);

      Cart.findOneAndUpdate(condition, update).exec((error, cdata) => {
        console.log("finde one and update runned");
        console.log(error);
        console.log(cdata);
        if (err) return res.status(400).json(error);
        if (cdata) res.status(201).json(cdata);
      });
    } else {

      console.log("cart not exits");
      
      const _cart = new Cart({
        user: req.user._id,
        cartItems: [
          {
            product: req.body.cartItems.product,
            quantity: req.body.cartItems.quantity,
            price: req.body.cartItems.price,
          },
        ],
      });

      _cart.save((err, cartdata) => {
        if (err) res.status(400).json({ message: "something went wrong",err });
        else if (cartdata) res.status(200).json(cartdata);
      });
    }
  });
};

exports.getProduct = (req,res) =>{
    Cart.findOne({user:req.user._id})
        .populate({path:'cartItems.product',select:'_id name quantity price productPictures'})
        .exec((err,data) =>{
        if(err)
        res.status(500).json("Something went wrong");
        if(data)
        res.status(200).json(data);
    }) 
}

exports.emptyCart = (req,res) =>{
  Cart.findOneAndUpdate({user:req.user._id},{
    $pull:{
      cartItems:{}
    }
  })
}