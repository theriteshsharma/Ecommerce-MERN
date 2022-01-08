import {productConstants} from "../actions/constants"

const initState = {
    products : []
}

export default (state = initState,action) =>{

    switch(action.type){
        // case productConstants.ADD_PRODUCT_SUCCESS :
        //     state = {
        //         products: action.paylode.products
        //     }
            // break;
        case productConstants.GET_PRODUCT_SUCCESS :
            state = {
                products: action.paylode.products
            }
            break;
        case productConstants.DELETE_PRODUCT_SUCCESS :
                state = {
                    products: action.paylode.product
                }
                break;
        case productConstants.ADD_PRODUCT_SUCCESS :
                   var updated = state.products;
                   updated.push(action.paylode);
                   state ={
                       products:updated
                   }
                    break;
    }
    return state;
}