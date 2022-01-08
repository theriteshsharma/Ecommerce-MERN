import { authConstants } from "./constants"
import axios from '../helpers/axios'
export const login = (user) =>{
          
     return async (dispatch) =>{

        const res = await axios.post('/signin',
        {
            ...user
        })
        dispatch({
            type:authConstants.LOGIN_REQUEST,
            paylode:{
                message:res.data.msg
            }
        })

        if(res.status == 200){
            const {token,user} = res.data;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));

            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                paylode:{
                    token,
                    user
                }
            });
        }else{
            if(res.status == 400){
                dispatch({
                    type:authConstants.LOGIN_FAILURE,
                    paylode:{
                        error:res.data.error
                    }
                })
            }
        }
    }
 }


 export const isLoggedIn = () =>{
    
    return async (dispatch)=> {
    const token   = localStorage.getItem('token');
  
    if(token){
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            paylode:{
                token,user
            }
        })
    }
    else 
    dispatch({
        type:authConstants.LOGIN_FAILURE,
        paylode:{
            err: "plz login"
        }
    });

}
 }

 export const signout = () => {
    return async (dispatch) =>{
        dispatch({type:authConstants.LOGOUT_REQUEST})

        const res = await axios.post('/signout');
        localStorage.clear();   
        if(res.status === 200)
        dispatch({
            type:authConstants.LOGOUT_SUCCESS,
            paylode:{
            message: res.data.message
            }
        })
        if(res.status ===400)
        dispatch({
            type:authConstants.LOGOUT_FAILURE,
            paylode:{
                error: res.data.error
            }
        })
        
    }
 }