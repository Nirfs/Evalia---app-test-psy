import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex flex-col w-full h-screen">
      <main className="flex-1 min-h-0 overflow-auto" role="main">
        <Outlet />
      </main>
    </div>
  )
}
