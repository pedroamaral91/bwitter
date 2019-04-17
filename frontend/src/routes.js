import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tweet from './pages/Timeline';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/" component={Tweet} />
    </Switch>
  </BrowserRouter>
);


export default Routes;