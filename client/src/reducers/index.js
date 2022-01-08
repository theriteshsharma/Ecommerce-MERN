import authReducer  from './auth.reducers'
import {combineReducers} from 'redux'
import userReducer from './user.reducers'
import productReducer from './product.reducers'
import categoryReducer from './category.reducers';
import cartReducer from './cart.reducer'
import orderReducer from './order.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product:productReducer,
    category:categoryReducer,
    cart:cartReducer,
    orders:orderReducer
})  

export default rootReducer