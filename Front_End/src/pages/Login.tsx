import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../Api/authFetch'

export default function Login() {
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userId || !userPassword) {
      setError('Tous les champs sont obligatoires')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userId)) {
      setError('Adresse mail ou mot de passe invalide')
      return
    }
    try {
      setError('')
      const user = await login(userId, userPassword)
      if (user.token) {
        localStorage.setItem('authToken', user.token)
        navigate(`/dashboard/${user.user.id}/acceuil`)
      }
    } catch (e) {
      console.error('Erreur dans la fonction handleSubmit:', e)

      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error('Erreur réseau')
    }
  }

  return (
    <section className="flex justify-center items-center h-full">
      <div className="w-1/2 flex justify-center items-center">
        <form className="w-[420px] p-8" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col mt-4">
            <label htmlFor="email" className="text-md mb-1 font-bold">
              Email
            </label>
            <input
              id="email"
              required
              className="border-2 p-3 rounded-md text-sm outline-blue-950"
              placeholder="mail"
              type="email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="password" className="text-md mb-1 font-bold">
              Mot de passe
            </label>
            <input
              id="password"
              required
              className="border-2 p-3 rounded-md text-sm outline-blue-950"
              placeholder="mot de passe"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-700 mt-2 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-950 text-white text-sm rounded-sm p-3 mt-7 hover:bg-blue-900 cursor-pointer"
          >
            Se connecter
          </button>
        </form>
      </div>
    </section>
  )
}
