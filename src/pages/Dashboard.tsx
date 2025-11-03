import { Link, Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
      <h1>DashBoard</h1>
      <nav>
        <Link to="test">Tests</Link>
        <Link to="testlist">Accueil</Link>
      </nav>
      <Outlet />
    </>
  )
}
