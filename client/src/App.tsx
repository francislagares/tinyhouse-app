/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { Viewer } from './lib/types';
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

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = (): JSX.Element => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  console.log(viewer);
  return (
    <Layout id='app'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/host' component={Host} />
        <Route exact path='/listing/:id' component={Listing} />
        <Route exact path='/listings/:location?' component={Listings} />
        <Route
          exact
          path='/login'
          render={props => <Login {...props} setViewer={setViewer} />}
        />
        <Route exact path='/user/:id' component={User} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;
