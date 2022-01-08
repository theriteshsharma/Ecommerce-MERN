const Order = require("../models/order");
const product = require("../models/product");

exports.addtoorder = (req, res) => {
  console.log(req.body);
  var flag = false;
  Order.findOne({ user: req.user._id }).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    if (data) {
      for ( let key of req.body.orderItems){
      console.log("Order was found");
        console.log(key)
      const product = key.product;
      const item = data.orderItems.find((c) => c.product == product);

      let condition, update;
      if (item) {
        console.log("item already exists");

        condition = { user: req.user._id ,"orderItems.product": product};
        update = {
          "$set": {
            "orderItems.$": {
              ...key,
              quantity: item.quantity + key.quantity,
            },
          },
        };

      }else {
        console.log("item does not exits");

        condition = { user: req.user._id };
        update = {
          "$push": {
            "orderItems": key,
          },
        };
      }

      Order.findOneAndUpdate(condition, update).exec((error, cdata) => {
        console.log("finde one and update runned");
        if (error) {
          flag=false;
          return res.status(400).json(error)
        }
        if (cdata) falg=true;

      });
      if(flag)  res.status(200)
    }
    

  } else {

      console.log("Order not exits");
      
      const _Order = new Order({
        user: req.user._id,
        orderItems: req.body.orderItems,


      });

      _Order.save((err, Orderdata) => {
        if (err) res.status(400).json({ message: "something went wrong",err });
        else if (Orderdata) res.status(200).json(Orderdata);
      });
    }
  
  });

};

exports.getOrders = (req,res) =>{
  console.log("getorder ")
    Order.findOne({})
        .populate({path:'orderItems.product',select:'_id name quantity price productPictures'})
        .exec((err,data) =>{
        if(err)
        res.status(500).json("Something went wrong");
        if(data)
        res.status(200).json(data);
    }) 
}
