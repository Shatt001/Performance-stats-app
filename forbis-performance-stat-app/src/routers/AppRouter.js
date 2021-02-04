import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import NotFoundPage from '../components/NotFoundPage';
import { StatsProvider } from '../context/stats-contex';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <StatsProvider>
        <React.Fragment>
          <Switch>
            <Route path='/' component={MainPage} exact={true} />
            <Route component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </StatsProvider>
    </BrowserRouter>
  );
};

export default AppRouter;