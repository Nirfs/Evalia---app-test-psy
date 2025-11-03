import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import Test from '../pages/Test'
import TestList from '../pages/TestList'

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
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'testlist',
            element: <TestList />,
          },
          {
            path: 'test', // relatif à /dashboard
            element: <Test />,
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
