import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import '@app/core/services/i18n.service';
import { RouterOutlet } from '@core/modules/custom-router-dom';
import { Footer, Header } from '@shared/components/layout/index';

import appRoutes from './app.routes';
import appMiddleware from './app.middleware';
import appReducer from './app.reducers';
import AppSuspense from './AppSuspense';

const middleware = createSagaMiddleware();
const store = createStore(
  appReducer,
  applyMiddleware(middleware, logger)
);

middleware.run(appMiddleware);

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppSuspense fallback={<></>}>
        <Header />
      </AppSuspense>
      <AppSuspense fallback={<></>}>
        <RouterOutlet routes={appRoutes} />
      </AppSuspense>
      <AppSuspense fallback={<></>}>
        <Footer />
      </AppSuspense>
    </BrowserRouter>
  </Provider>
);
