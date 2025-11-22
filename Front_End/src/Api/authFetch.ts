const apiUrl = import.meta.env.VITE_API_URL

export async function signUp(name: string, email: string, password: string, inviteCode: string) {
  try {
    const res = await fetch(`${apiUrl}/auth/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, inviteCode }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Création de compte impossible')
    }

    return data.user
  } catch (e) {
    console.error('Erreur dans la fonction signUp:', e)

    if (e instanceof Error) {
      throw new Error(e.message)
    }

    throw new Error('Erreur réseau')
  }
}

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Connexion impossible')
    }

    localStorage.setItem('authToken', data.token)

    return { ...data.user, token: data.token }
  } catch (e) {
    console.error('Erreur login:', e)
    if (e instanceof Error) throw new Error(e.message)
    throw new Error('Erreur réseau')
  }
}

export async function createPatient(name: string, email: string) {
  const token = localStorage.getItem('authToken')
  if (!token) throw new Error('Utilisateur non authentifié')

  const res = await fetch(`${apiUrl}/auth/psy/create-patient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.error || 'Impossible de créer le patient')

  return data
}
