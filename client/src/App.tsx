import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Host, Listing, Listings, NotFound, User } from './sections';
import './App.css';

const App = (): JSX.Element => {
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/host' component={Host} />
        <Route exact path='/listing/:id' component={Listing} />
        <Route exact path='/listings/:location?' component={Listings} />
        <Route exact path='/user/:id' component={User} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
