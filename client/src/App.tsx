/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Affix, Layout, Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { AppHeaderSkeleton, ErrorBanner } from './lib/components';
import { LOG_IN } from './lib/graphql/mutations';
import {
  LogIn as LogInData,
  LogInVariables,
} from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import { Viewer } from './lib/types';
import {
  AppHeader,
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
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className='app-skeleton'>
        <AppHeaderSkeleton />
        <div className='app-skeleton__spin-section'>
          <Spin size='large' tip='Launching Tinyhouse' />
        </div>
      </Layout>
    );
  }

  const LogInErrorBannerElement = error ? (
    <ErrorBanner
      description={`We weren't able to verify if you were logged. Please try again later!`}
    />
  ) : null;
  {
    LogInErrorBannerElement;
  }
  return (
    <Layout id='app'>
      <Affix offsetTop={0} className='app_affix-header'>
        <AppHeader viewer={viewer} setViewer={setViewer} />
      </Affix>
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
        <Route
          exact
          path='/user/:id'
          render={props => <User {...props} viewer={viewer} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;
