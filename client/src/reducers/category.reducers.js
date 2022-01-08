import { categoryConstants } from '../actions/constants'

const initstate = {
    categories:[],
    loading:false,
    error:null
};

const buildNewCategories = (id,categories,category) =>{
    let mycategories = [];
    if(id === undefined){
        return [
            ...categories,
            {
                _id : category._id,
                name: category.name,
                slug : category.slug,
                children : []   
            }
        ]
    }

    for(let cate of categories){

        if(cate._id === id ){
            console.log("category matched")
        mycategories.push(
            {
                ...cate,
                children: cate.children  ? buildNewCategories(id,[...cate.children,{
                    _id: category._id,
                    name: category.name,
                    slub: category.slug,
                    parentId: category.parentId,
                    children: category.children
                    
                }],category):[]
            }
        )
    }
        else
        mycategories.push(
            {
                ...cate,
                children: cate.children ? buildNewCategories(id,cate.children,category) : [],
            }
        )
    }
    return mycategories
}

export default (state = initstate ,action) =>{

    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories:action.paylode.category,
                loading:false
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE :
            state = {
                ...state
            }
            break;
            case categoryConstants.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case categoryConstants.ADD_CATEGORY_SUCCESS:
            const category = action.paylode.category.category;

            const updated = buildNewCategories(category.parentId,state.categories,category);
            console.log(updated)
            state = {
                ...state,
               categories:updated,
                loading:false
            }
            break;
        case categoryConstants.ADD_CATEGORY_FAILURE :
            state = {
                ...initstate
            }
            break;
    }
    return state;
}