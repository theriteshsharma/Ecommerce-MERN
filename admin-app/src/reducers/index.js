import authReducer  from './auth.reducers'
import {combineReducers} from 'redux'
import userReducer from './user.reducers'
import categoryReducer from './category.reducers'
import productReducer from './product.reducers'
import ordersReducer from './order.reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    orders: ordersReducer
})  

export default rootReducer