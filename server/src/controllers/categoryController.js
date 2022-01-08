const slugify = require("slugify");
const Category = require("../models/category");

function createCategoryList(categories, parentId = null) {
  const categorylist = [];
  let category;
  if (parentId == null)
    category = categories.filter((cat) => cat.parentId == null);
  else category = categories.filter((cat) => cat.parentId == parentId);
  for (let cate of category) {
    categorylist.push({
      _id: cate._id,
      name: cate.name,
      children: createCategoryList(categories, cate._id),
      parentId: cate.parentId,
      checked:false
    });
  }
  return categorylist;
}

exports.createCategory = (req, res) => {
  let fileurl = "";
  if (req.file) {
    fileurl = process.env.API + req.file.filename;
  }
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    categoryImage: fileurl,
  };
  if (req.body.parentId) categoryObj.parentId = req.body.parentId;

  const _cat = new Category(categoryObj);

  _cat.save((err, category) => {
    if (err)
      res.status(500).json({
        messsage: "Something went wrong",
      });
    else
      res.status(201).json({
        category,
      });
  });
};

exports.getCategory = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err)
      res.status(500).json({
        messsage: "Something went wrong",
      });
    if (data) {
      data = createCategoryList(data);
      res.status(200).json({
        data,
      });
    }
  });
};

exports.deleteCategories = (req, res) => {
  console.log(req.body)
 
    Category.deleteMany({ "$or" : [ {_id:req.body.arr} , { parentId:req.body.arr}] } , (err) =>{
      if(err) 
      {res.status(500).json({err});
      return}
    });
    res.status(200);

//  Category.findOneAndDelete( { _id:req.body.id},(err,data)=>{
//    if(err) res.status(500).json({err});
//    else 
//    if(data) res.status(200).json(data);
//  } )
};


