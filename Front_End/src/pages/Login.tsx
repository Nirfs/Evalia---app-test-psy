import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../Api/authFetch'
import { InputText } from '../components/InputText'
import { Button } from '../components/Button'

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
          <InputText
            id="email"
            label="Email"
            type="email"
            placeholder="mail"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <InputText
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="mot de passe"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-700 mt-2 text-center">{error}</p>}

          <Button type="submit" text="Se connecter" />
        </form>
      </div>
    </section>
  )
}
