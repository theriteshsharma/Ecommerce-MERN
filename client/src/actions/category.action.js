import axios from '../helpers/axios'
import {categoryConstants} from './constants'

export const getAllCategory = () =>{
    return async dispatch =>{
        console.log("category action")
        dispatch({type:categoryConstants.GET_ALL_CATEGORY_REQUEST})
        const res = await axios.get('/category');
        if(res.status == 200){
            const {data} =  res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                paylode : {
                   category: data
                }
            })
        }
        else{
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORY_FAILURE
            })
        }

    }
}

export const addCategory = (formData) =>{
    return async dispatch =>{
        dispatch({type:categoryConstants.ADD_CATEGORY_REQUEST})
      
        const res = await axios.post('/category/create',formData);
        console.log(res);
        if(res.status == 201){
            const {data} =  res;
            dispatch({
                type: categoryConstants.ADD_CATEGORY_SUCCESS,
                paylode : {
                   category: data
                }
            })
        }
        else{
            dispatch({
                type:categoryConstants.ADD_CATEGORY_FAILURE
            })
        }

        
    }
}

export const deleteCategories= (array) =>{
    return async (dispatch) =>{
        console.log(array);
        const res = await axios.post("/category/delete",array);
        console.log(res);


    }
}