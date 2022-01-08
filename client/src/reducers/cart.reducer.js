import { cartConstants } from "../actions/constants";

const initState = {
    id:'',
    user:'',
    cartItems:[],
    loading:false,
    err:null
}

export default (state=initState,action) =>{
    switch(action.type){
        case cartConstants.ADD_TO_CART_SUCCESS:
            state={
                cartItems:action.paylode,
                loading:false
            }
            break;
        case cartConstants.GET_CART_ITEMS_SUCCESS:
            var value = action.paylode.cartItems
            state={
                cartItems:value,
                id:action.paylode._id,
                user:action.paylode.user
            }
    }
    return state;
}