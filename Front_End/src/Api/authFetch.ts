const apiUrl = import.meta.env.VITE_API_URL

export async function signUp(name: string, email: string, password: string) {
  try {
    const res = await fetch(`${apiUrl}/api/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    const user = await res.json()

    if (!res.ok) {
      throw new Error('Création de compte impossible')
    }

    return user
  } catch (e) {
    console.error('Erreur dans la fonction signUp:', e)

    if (e instanceof Error) {
      throw new Error(e.message)
    }

    throw new Error('Erreur réseau')
  }
}
