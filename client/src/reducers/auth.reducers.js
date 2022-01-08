import { authConstants } from "../actions/constants"

const initState = {
    token:null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        picture:'',
    },
    authenticate:false,
    authenticating: false,
    error:null,
    message:'',
    loading:false

}


export default (state=initState,action)=>{
  
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating:true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                token:action.paylode.token,
                user:action.paylode.user,
                authenticate:true,
                authenticating:false    
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state={
                ...state,
                laoding:true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state={
                ...initState,
                message:action.paylode.message,
                loading:false
               
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state={
                ...state,
                error: action.paylode.error
            }
            break;
    }
    return state;

}