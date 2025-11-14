import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <div className="flex justify-between m-8">
        <h1>Header</h1>
        <nav className="flex gap-4">
          <NavLink to={'/register'}>Register</NavLink>
          <NavLink to={'/'}>Se connecter</NavLink>
        </nav>
      </div>
    </>
  )
}
