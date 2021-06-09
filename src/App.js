import React, {useEffect} from 'react';
import './App.css';
import Header from './Components/headerComponent/Header';
import Home from './Components/homeComponent/Home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Checkout from './Components/checkoutComponent/Checkout';
import Login from './Components/loginComponent/Login';
import {auth} from './Firebase';
import { useStateValue } from './StateProvider'
import Payment from './Components/paymentComponent/Payment';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './Components/ordersComponent/Orders';

const promise = loadStripe("pk_test_51I9bu7HeoDE2yL4xQJbsdHJtpz7v1Pf8f7g4tG8LzaPb66ISYx4aJre4HO3XsDqIFNYRPxutmnN9Tresc8tBkuIR00GG6Gp6bA");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
    <div className="app">
      
      <Switch> 
        <Route path="/orders">
          <Header/>
          <Orders/>
        </Route>

        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/checkout"> 
         <Header/>
          <Checkout/>
        </Route>

        <Route path="/payment"> 
         <Header/>
         <Elements stripe={promise}>
          <Payment/>
         </Elements>  
        </Route>

        <Route path="/">
          <Header/>
          <Home/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;