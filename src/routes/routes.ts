import { lazy } from 'react';

const StatisticsPage = lazy(() => import('@/pages/statistics/StatisticsPage'));
const ContainerUsers = lazy(() => import('@/pages/users/UsersPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export interface AppRoute {
  path: string;
  element: React.LazyExoticComponent<React.FC>;
}

const routes: AppRoute[] = [
  {
    path: '/',
    element: ContainerUsers,
  },
  {
    path: '/statistics',
    element: StatisticsPage,
  },
  {
    path: '*',
    element: NotFoundPage,
  }
];

export default routes;
