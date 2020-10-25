import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Payment from './Payment';
import Checkout from './Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51HelJdDH66TwfyoLECGyhBxE9z3dd89kyhQreAb792CcpFcZrbT1FaT2eGcf4tHK6DKLHwrLvMRP9JF883qEc7iS00xIu96sMa')

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    //only runs one-time the app function is rendered
    auth.onAuthStateChanged(authUser => {
      console.log('the user is >>>>>>> ' + authUser);
      if (authUser) {
        // user just logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        //user logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, []);
  return (
    //BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
