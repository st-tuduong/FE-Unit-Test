import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import appReducer from '@app/app.reducers';
import '@testing-library/jest-dom/extend-expect';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import appMiddleware from '@app/app.middleware';
import UserList from './UserList';
const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
              lat: '-37.3159',
              lng: '81.1496',
            },
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        },
        {
          id: 2,
          name: 'Ervin Howell',
          username: 'Antonette',
          email: 'Shanna@melissa.tv',
          address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
              lat: '-43.9509',
              lng: '-34.4618',
            },
          },
          phone: '010-692-6593 x09125',
          website: 'anastasia.net',
          company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains',
          },
        },
        {
          id: 3,
          name: 'Clementine Bauch',
          username: 'Samantha',
          email: 'Nathan@yesenia.net',
          address: {
            street: 'Douglas Extension',
            suite: 'Suite 847',
            city: 'McKenziehaven',
            zipcode: '59590-4157',
            geo: {
              lat: '-68.6102',
              lng: '-47.0653',
            },
          },
          phone: '1-463-123-4447',
          website: 'ramiro.info',
          company: {
            name: 'Romaguera-Jacobson',
            catchPhrase: 'Face to face bifurcated interface',
            bs: 'e-enable strategic applications',
          },
        },
      ])
    );
  })
);

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware, logger));

const ReduxWrapper = ({ children }) => {
  middleware.run(appMiddleware);
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path='*' element={children} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Test Component User List', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  describe('When call API success', () => {
    test('Should be render list of users', async () => {
      render(<UserList />, { wrapper: ReduxWrapper });
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryAllByTestId('user')).toHaveLength(3);
      });
    });
  });

  describe('When user interaction', () => {
    test('Should be user interaction', async () => {
      render(<UserList />, { wrapper: ReduxWrapper });
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryAllByTestId('user')).toHaveLength(3);
      });
      fireEvent.click(screen.getByTestId('btn-remove-1'));
      expect(screen.queryByTestId('btn-remove-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('user-link-2')).toBeInTheDocument();
      expect(screen.getByTestId('user-link-2')).toHaveAttribute(
        'href',
        '/user/2'
      );
    });
  });

  describe('When call API error', () => {
    test('Should be no render list of users', async () => {
      server.use(
        rest.get(
          'https://jsonplaceholder.typicode.com/users',
          (req, res, ctx) => {
            return res(ctx.status(500));
          }
        )
      );
      render(<UserList />, { wrapper: ReduxWrapper });
      expect(screen.getByTestId('loading'));
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          'Oops, failed to fetch!'
        );
      });
    });
  });
});
