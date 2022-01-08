
import axios from "../helpers/axios";
import { productConstants } from "./constants"

export const addProduct = (form) =>{
    return async dispatch =>{

        dispatch({type: productConstants.ADD_PRODUCT_REQUEST});

        const res = await axios.post('/product/create',form);
        console.log(res)

        if(res.status == 201)
            dispatch({
                type: productConstants.ADD_PRODUCT_SUCCESS,
                paylode:res.data
            })
        else 
        dispatch({
            type: productConstants.ADD_PRODUCT_FAILURE
        })
        
    }
}
export const deleteProduct = (product) =>{
    return async dispatch =>{

        dispatch({type: productConstants.DELETE_PRODUCT_REQUEST});

        const res = await axios.post('/product/delete',product);
        console.log(res)

        if(res.status == 201)
            dispatch({
                type: productConstants.DELETE_PRODUCT_SUCCESS,
                paylode:res.data
            })
            

        else 
        dispatch({
            type: productConstants.DELETE_PRODUCT_FAILURE
        })
        
    }
}