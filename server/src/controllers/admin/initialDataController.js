const Category = require("../../models/category")
const Product = require("../../models/product")

function createCategoryList(categories,parentId=null){

    const categorylist = [];
    let category;
    if(parentId == null)
    category = categories.filter(cat => cat.parentId == null)
    else category  = categories.filter(cat => cat.parentId == parentId)

    for(let cate of category){
        categorylist.push({
            _id : cate._id,
            name: cate.name,
            children: createCategoryList(categories,cate._id),
            parentId: cate.parentId,
            checked:false

        });
    }
    return categorylist;
}
exports.initialData = async (req,res) =>{
    const products = await Product.find({})
                                    .select('_id name price quantity slug description productPictures category')
                                    .populate({path:'category', select:'_id name'})
                                    .exec();
    const category = await Category.find({}).exec();
    
    res.status(200).json({
        category: createCategoryList(category),
        products
    })
}       