import axios from 'axios'
import {api} from '../urlconfig';
import {authConstants}  from '../actions/constants'
const token  = localStorage.getItem('token');
const store = "../store";

const axiosInstance = axios.create({
    baseURL: api,
    headers:{
        "authorization": token ? token : null
    }
});

axios.interceptors.request.use((req)=>{
    const {auth} = store.getState();
    if(auth.token){
        req.headers.Authorization = auth.token
    }
    return req
})

axios.interceptors.response.use((res)=>{
},(err)=>{
    console.log(err.response)
    const {status} = err.response;
    if(status==203){
        localStorage.clear();
        store.dispatch({type:authConstants.LOGOUT_SUCCESS});
    }
    return Promise.reject(err)
})

export default axiosInstance;