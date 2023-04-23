import React from 'react';

import { PageRoute } from '@core/modules/custom-router-dom/router.interface';
import homeRoutes from './home/home.routes';
import userRoutes from './users/user.routes';

const Page = React.lazy(() => import('./Page'));

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: Page,
    children: [
      ...homeRoutes,
      ...userRoutes
    ]
  }
];

export default pageRoutes;
