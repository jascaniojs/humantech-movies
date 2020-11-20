import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Layout from '../components/Layout';
import NotFound from '../containers/NotFound';
import ResponsiveDrawer from '../components/Drawer';
import Peliculas from '../containers/Peliculas';

const App = () => (
  <BrowserRouter>
    <ResponsiveDrawer />
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/peliculas' component={Peliculas} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
export default App;
