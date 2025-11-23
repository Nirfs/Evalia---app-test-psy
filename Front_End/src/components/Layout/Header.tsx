import { Link } from 'react-router-dom'
import { HashLinkTemplate } from '../Link/HashLinkTemplate'
import { useAuth } from '../../context/useAuth'

export function Header() {
  const { isLoggedIn, logout } = useAuth()

  const handleDisconnected = () => {
    localStorage.removeItem('authToken')
    logout()
  }

  return (
    <header className="flex justify-between bg-[#212529] text-white p-6 shadow-md my-10 mx-20 rounded-[7px]">
      <h1 className="text-xl font-bold">Evalia</h1>
      <nav>
        <ul className="flex gap-10 pr-5 text-[1rem] cursor-pointer">
          <li>
            <HashLinkTemplate to="#solution" text="SOLUTION" />
          </li>
          <li>
            <HashLinkTemplate to="#qui" text="QUI SOMME NOUS" />
          </li>
          <li>
            {!isLoggedIn ? (
              <Link to="/signin">SE CONNECTER</Link>
            ) : (
              <Link to="/" onClick={handleDisconnected}>
                SE DECONNECTER
              </Link>
            )}
          </li>
          <li>{!isLoggedIn ? <HashLinkTemplate to="/signup" text="CRÉER UN COMPTE" /> : null}</li>
        </ul>
      </nav>
    </header>
  )
}
