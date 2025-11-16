import { useLoaderData } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import DashboardMenu from './DashboardMenu'
import NotFound from './NotFound'
import type { Psychologist } from '../type/type'

export default function Dashboard() {
  const thérapeute = useLoaderData() as Psychologist

  if (!thérapeute || !thérapeute.id) return <NotFound />

  if (!thérapeute) return <NotFound />
  return (
    <>
      <div className="flex h-screen">
        <DashboardMenu />
        <Outlet />
      </div>
    </>
  )
}
