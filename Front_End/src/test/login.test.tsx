import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Login from '../pages/Login'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('submit function', () => {
  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
  }

  it('affiche les champs du formulaire', () => {
    renderLogin()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
  })

  it('affiche une erreur si les champs sont vides', async () => {
    const user = userEvent.setup()
    renderLogin()

    const submitBtn = screen.getByRole('button', { name: 'Se connecter' })

    await user.click(submitBtn)
    expect(screen.getByText(/Tous les champs sont obligatoires/i)).toBeInTheDocument()
  })

  it('affiche une erreur si pas un mail', async () => {
    const user = userEvent.setup()
    renderLogin()

    const mailSubmit = screen.getByLabelText(/email/i)
    const submitBtn = screen.getByRole('button', { name: 'Se connecter' })
    const passInput = screen.getByLabelText(/mot de passe/i)

    await user.type(mailSubmit, 'pasUnMailmail')
    await user.type(passInput, 'somepassword')
    await user.click(submitBtn)

    expect(await screen.getByText(/Adresse mail ou mot de passe invalide/i)).toBeInTheDocument()
  })

  it('redirige vers /dashboard après une connexion réussie', async () => {
    const user = userEvent.setup()
    renderLogin()

    const mailSubmit = screen.getByLabelText(/email/i)
    const submitBtn = screen.getByRole('button', { name: 'Se connecter' })
    const passInput = screen.getByLabelText(/mot de passe/i)

    await user.type(mailSubmit, 'nom.prenom@gmail.com')
    await user.type(passInput, 'somepassword')
    await user.click(submitBtn)

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })
})
