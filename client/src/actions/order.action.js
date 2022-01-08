import { orderConstants } from './constants';
import axios from '../helpers/axios';

export const addtoorder = (product) =>{

    return async (dispatch) =>{
        console.log(product)
        // dispatch({type:orderConstants.ADD_TO_ORDER_REQUEST})
        
        const res = await axios.post('/order/addtoorder', {orderItems:product});
        console.log(res);
        if(res.status==200){
            dispatch({
                type:orderConstants.ADD_TO_ORDER_REQUEST,
                paylode:res.data
            })
        }
        else
        {
            dispatch({type:orderConstants.ADD_TO_ORDER_FAILURE,
                    paylode:res.data
            })
        }
    }
}

export const getOrderItems = (product) =>{

    return async (dispatch) =>{
        dispatch({type: orderConstants.GET_ORDER_ITEMS_REQUEST})
        const res = await axios.get('/order');
        if(res.status==200){
            dispatch({
                type:orderConstants.GET_ORDER_ITEMS_SUCCESS,
                paylode:res.data
            })
        }
        else
        {
            dispatch({type:orderConstants.GET_ORDER_ITEMS_FAILURE,
                    paylode:res.data
            })
        }
    }
}