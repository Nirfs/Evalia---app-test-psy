import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Api/authFetch'
import { InputText } from '../components/InputText'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email.trim() || !password.trim()) {
      setError('Tous les champs sont obligatoires')
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Adresse email invalide')
      setLoading(false)
      return
    }

    try {
      const user = await login(email.trim(), password.trim())
      if (user.id) {
        navigate(`/dashboard/${user.id}/acceuil`)
      } else {
        setError('Impossible de récupérer l’ID utilisateur')
      }
    } catch (err) {
      console.error('Erreur login:', err)
      if (err instanceof Error) setError(err.message)
      else setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow flex justify-center items-center bg-gray-50">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow rounded overflow-hidden">
          {/* Image à gauche */}
          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1714976694810-85add1a29c96?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Illustration login"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Formulaire à droite */}
          <form
            className="w-full md:w-1/2 p-8 flex flex-col justify-center"
            onSubmit={handleSubmit}
            noValidate
          >
            <h1 className="text-2xl font-bold mb-6 text-center">Connexion Psychologue</h1>

            <div className="mb-4">
              <InputText
                id="email"
                label="Email"
                type="email"
                placeholder="votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <InputText
                id="password"
                label="Mot de passe"
                type="password"
                placeholder="votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

            <Button
              type="submit"
              text={loading ? 'Connexion...' : 'Se connecter'}
              loading={loading}
            />

            <p className="mt-4 text-center text-sm text-gray-500">
              Pas encore de compte ?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Inscrivez-vous
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
