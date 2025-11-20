import { useLoaderData } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import DashboardMenu from '../components/DashboardMenu'
import NotFound from './NotFound'
import type { Psychologist } from '../type/type'

export default function Dashboard() {
  const thérapeute = useLoaderData() as Psychologist

  if (!thérapeute || !thérapeute.id) return <NotFound />

  return (
    <div className="flex h-full">
      <DashboardMenu />
      <div className="flex-1 min-h-0 overflow-auto">
        <Outlet context={thérapeute} />
      </div>
    </div>
  )
}
