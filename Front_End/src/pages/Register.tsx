import { useState } from 'react'
import { signUp } from '../Api/authFetch.ts'
import { InputText } from '../components/InputText.tsx'
import { Button } from '../components/Button.tsx'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      await signUp(trimmedName, trimmedEmail, trimmedPassword)
      setSuccess('Compte créé !')
    } catch (err) {
      console.error('Erreur handleSubmit:', err)

      if (err instanceof Error) {
        setError(err.message || 'Erreur inconnue')
      } else {
        setError('Erreur réseau')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex justify-center items-center h-full">
      <div className="w-1/2 flex justify-center items-center">
        <form className="w-[420px] p-8" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col mt-4">
            <InputText
              label="Name"
              id="name"
              required
              placeholder="votre nom"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4">
            <InputText
              label="Email"
              id="email"
              required
              placeholder="mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-4">
            <InputText
              label="Mot de passe"
              id="password"
              required
              placeholder="mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-700 mt-2 text-center">{error}</p>}
          {success && <p className="text-green-700 mt-2 text-center">{success}</p>}

          <Button
            type="submit"
            text={loading ? 'Création en cours...' : 'Créer un compte'}
            loading={loading}
          />
        </form>
      </div>
    </section>
  )
}
