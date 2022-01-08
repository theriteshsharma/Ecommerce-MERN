import { categoryConstants, initialDataConstants, productConstants } from './constants'

import axios from '../helpers/axios'


export const getInitialData = () =>{
    return async dispatch => {
        dispatch({type:initialDataConstants.INITIAL_DATA_REQUEST});

        const res = await axios.post('/initdata',{});
        console.log(res);
        
       if(res.status == 200)
        {
            const {products,category} = res.data;

            dispatch(
                {type:categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                    paylode: {
                        category
                    }
            })
            dispatch({
                type:productConstants.GET_PRODUCT_SUCCESS,
                paylode:{
                    products
                }
            })

        }


    }
}