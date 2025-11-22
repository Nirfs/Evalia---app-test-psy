const apiUrl = import.meta.env.VITE_API_URL

export async function getPsy() {
  const token = localStorage.getItem('authToken')
  if (!token) throw new Error('Utilisateur non authentifié')

  try {
    const res = await fetch(`${apiUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Impossible de récupérer les infos du psychologue')
    }

    return data
  } catch (e) {
    console.error('Erreur getPsy:', e)
    if (e instanceof Error) throw new Error(e.message)
    throw new Error('Erreur réseau')
  }
}
