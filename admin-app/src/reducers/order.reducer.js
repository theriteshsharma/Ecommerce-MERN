import { orderConstants } from "../actions/constants";

const initState = {
    id:'',
    user:'',
    orderItems:[],
    loading:false,
    err:null
}

export default (state=initState,action) =>{
    switch(action.type){
        case orderConstants.ADD_TO_ORDER_SUCCESS:
            state={
                orderItems:action.paylode,
                loading:false
            }
            break;
        case orderConstants.GET_ORDER_ITEMS_SUCCESS:
            var value = action.paylode.orderItems
            state={
                orderItems:value,
                id:action.paylode._id,
                user:action.paylode.user
            }
    }
    return state;
}