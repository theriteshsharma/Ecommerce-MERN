import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute'
import Home from './containers/Home'
import  Signin from './containers/Signin'
import Signup from './containers/Signup'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getInitialData, isLoggedIn } from './actions';
import Product from './containers/Product';
import Orders from './containers/Orders';
import Category from './containers/Category';



function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(()=>{
      if(!auth.authenticate){
          dispatch(isLoggedIn());
      }
      dispatch(getInitialData()); 
  },[])
  return (
    <div className="App">
      
        <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/product" exact component={Product} />
        <PrivateRoute path="/orders" exact component={Orders} />
        <PrivateRoute path="/category" exact component={Category} />



        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        </Switch>

     
    </div>
  );
}

export default App;
