/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'

import { PATH } from './RouterConstants'
import { IRoute } from './RouterTypes'

const AuthPage = lazy(() => import('@pages/AuthPage'))
const DashboardPage = lazy(() => import('@pages/DashboardPage'))
const ClientsPage = lazy(() => import('@pages/ClientsPage'))
const BillingPage = lazy(() => import('@pages/BillingPage'))
const NotificationsPage = lazy(() => import('@pages/NotificationsPage'))
const AdminsPage = lazy(() => import('@pages/AdminsPage'))
const ProfilePage = lazy(() => import('@pages/ProfilePage'))

const ROUTER: IRoute[] = [
  {
    path: PATH.auth,
    page: AuthPage,
  },
  {
    path: PATH.dashboard,
    page: DashboardPage,
  },
  {
    path: PATH.clients,
    page: ClientsPage,
  },
  {
    path: PATH.billing,
    page: BillingPage,
  },
  {
    path: PATH.notifications,
    page: NotificationsPage,
  },
  {
    path: PATH.admins,
    page: AdminsPage,
  },
  {
    path: PATH.profile,
    page: ProfilePage,
  },
]

export default ROUTER