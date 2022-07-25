import { userConstants } from "./constants"
import axios from '../helpers/axios'
export const signup = (user) =>{
         
     return async (dispatch) =>{
        const res = await axios.post('/admin/signup',
        {
            ...user
        })

        dispatch({
            type:userConstants.USER_REGISTER_REQUEST,
        })

        if(res.status === 200){
            dispatch({
                type:userConstants.USER_REGISTER_SUCCESS,
                paylode:{
                    message:res.data.message
                }
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type:userConstants.USER_REGISTER_FAILURE,
                    paylode:{
                        error:res.data.error
                    }
                })
            }
        }
    }
 }
