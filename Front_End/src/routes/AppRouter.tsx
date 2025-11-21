import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import { getPsy } from '../Api/users'
import { Acceuil } from '../components/DashboardMain/Acceuil'
import { Tests } from '../components/DashboardMain/Tests'
import { Notes } from '../components/DashboardMain/Notes'
import { Patients } from '../components/DashboardMain/Patients'
import { Reglages } from '../components/DashboardMain/Reglage'

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
            path: 'test',
            element: <Tests />,
          },
          {
            path: 'patients',
            element: <Patients />,
          },
          {
            path: 'notes',
            element: <Notes />,
          },
          {
            path: 'reglage',
            element: <Reglages />,
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
