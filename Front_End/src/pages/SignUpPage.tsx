import { useState } from 'react'
import { signUp } from '../Api/authFetch.ts'
import { InputText } from '../components/InputText.tsx'
import { Button } from '../components/Button.tsx'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=?;:,<>{}[\]~]).{7,}$/

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError('Veuillez remplir tous les champs')
      setSuccess('')
      return
    }

    if (!passwordRegex.test(trimmedPassword)) {
      setError(
        'Le mot de passe doit faire au moins 7 caractères, contenir une majuscule et un caractère spécial.'
      )
      setSuccess('')
      return
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError('Entrez une adresse email valide')
      setSuccess('')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await signUp(trimmedName, trimmedEmail, trimmedPassword, inviteCode)
      setSuccess('Compte créé !')
    } catch (err) {
      console.error('Erreur handleSubmit:', err)
      if (err instanceof Error) setError(err.message || 'Erreur inconnue')
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
              src="https://plus.unsplash.com/premium_photo-1664378617455-228a15026738?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Illustration signup"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Formulaire à droite */}
          <form
            className="w-full md:w-1/2 p-8 flex flex-col justify-center"
            onSubmit={handleSubmit}
            noValidate
          >
            <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>

            <InputText
              label="Nom"
              id="name"
              required
              placeholder="votre nom"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputText
              label="Email"
              id="email"
              required
              placeholder="votre email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputText
              label="Mot de passe"
              id="password"
              required
              placeholder="mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputText
              label="Code d'invitation"
              id="inviteCode"
              required
              placeholder="Votre code d'invitation"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />

            {error && <p className="text-red-700 mt-2 text-center">{error}</p>}
            {success && <p className="text-green-700 mt-2 text-center">{success}</p>}

            <Button
              type="submit"
              text={loading ? 'Création en cours...' : 'Créer un compte'}
              loading={loading}
            />

            <p className="mt-4 text-center text-sm text-gray-500">
              Déjà un compte ?{' '}
              <Link to="/" className="text-blue-500 hover:underline">
                Connectez-vous
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
