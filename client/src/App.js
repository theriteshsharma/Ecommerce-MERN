import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router';
import Home from './containers/Home'
import  Signin from './containers/Signin'
import Signup from './containers/Signup'
import PrivateRoute from "./components/HOC/PrivateRoute"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData } from './actions';
import { isLoggedIn } from './actions';
import Cart from './containers/Cart';
import Orders from './containers/Orders';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(()=>{
    if(!auth.authenticate)
    dispatch(isLoggedIn())
    dispatch(getInitialData());
  },[])
  return (
    <div className="App">
        <Switch>
          <PrivateRoute path="/" exact component={Home}/>
          <PrivateRoute path="/cart" exact component={Cart}/>
          <PrivateRoute path="/order" exact component={Orders}/>
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          
        </Switch>
    </div>
  );
}

export default App;
