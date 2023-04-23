import React from 'react';

import { PageRoute } from '@core/modules/custom-router-dom/router.interface';

const UserList = React.lazy(() => import('./containers/UserList'));
const User = React.lazy(() => import('./containers/User'));

const userRoutes: PageRoute[] = [
  {
    path: '/user',
    element: UserList
  },
  {
    path: '/user/:id',
    element: User
  }
];

export default userRoutes;
