import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import {
  Home,
  Host,
  Listing,
  Listings,
  Login,
  NotFound,
  User,
} from './sections';
import './App.css';

const App = (): JSX.Element => {
  return (
    <Layout id='app'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/host' component={Host} />
        <Route exact path='/listing/:id' component={Listing} />
        <Route exact path='/listings/:location?' component={Listings} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/user/:id' component={User} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;
