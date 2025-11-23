import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import SignUpPage from '../pages/SignUpPage'
import { getPsy, getPatients } from '../Api/usersFetch'
import { Acceuil } from '../components/DashboardMain/Acceuil'
import { Tests } from '../components/DashboardMain/Tests'
import { Notes } from '../components/DashboardMain/Notes'
import { Patients } from '../components/DashboardMain/Patients'
import { Reglages } from '../components/DashboardMain/Reglage'
import LandingLayout from '../pages/LandingLayout'
import { Landing } from '../pages/Landing'

const router = createBrowserRouter([
  // Landing routes...
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'signin', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },

  // Dashboard avec :id (parent)
  {
    path: '/dashboard/',
    element: <Dashboard />,
    loader: getPsy,
    children: [
      { index: true, element: <Acceuil /> }, // /dashboard/:id
      { path: 'acceuil', element: <Acceuil /> }, // /dashboard/:id/acceuil
      { path: 'notes', element: <Notes /> }, // /dashboard/:id/notes
      { path: 'patients', loader: getPatients, element: <Patients /> },
      { path: 'test', element: <Tests /> },
      { path: 'reglage', element: <Reglages /> },
    ],
  },

  { path: '*', element: <NotFound /> },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
