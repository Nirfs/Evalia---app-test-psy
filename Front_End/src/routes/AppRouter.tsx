import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import { getPsy } from '../Api/users'
import { Acceuil } from '../pages/DashboardMain/Acceuil'
import { ListTest } from '../pages/DashboardMain/ListTest'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: 'dashboard/:id',
        element: <Dashboard />,
        loader: getPsy,
        HydrateFallback: () => null,
        children: [
          {
            path: 'acceuil',
            element: <Acceuil />,
          },
          {
            path: 'testlist',
            element: <ListTest />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
