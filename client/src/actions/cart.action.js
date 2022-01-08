import {cartConstants} from './constants';
import axios from '../helpers/axios';

export const addtocart = (product) =>{

    return async (dispatch) =>{
        console.log(product)
        dispatch({type: cartConstants.ADD_TO_CART_REQUEST})
        const res = await axios.post('/cart/addtocart',{cartItems:product});
        console.log(res);
        if(res.status==201){
            dispatch({
                type:cartConstants.ADD_TO_CART_REQUEST,
                paylode:res.data
            })
        }
        else
        {
            dispatch({type:cartConstants.ADD_TO_CART_FAILURE,
                    paylode:res.data
            })
        }
    }
}

export const getCartItems = (product) =>{

    return async (dispatch) =>{
        console.log(product)
        dispatch({type: cartConstants.GET_CART_ITEMS_REQUEST})
        const res = await axios.get('/cart');
        console.log(res);
        if(res.status==200){
            dispatch({
                type:cartConstants.GET_CART_ITEMS_SUCCESS,
                paylode:res.data
            })
        }
        else
        {
            dispatch({type:cartConstants.GET_CART_ITEMS_FAILURE,
                    paylode:res.data
            })
        }
    }
}