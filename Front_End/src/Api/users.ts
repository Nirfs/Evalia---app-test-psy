import type { LoaderFunctionArgs } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL

export async function getPsy({ params }: LoaderFunctionArgs) {
  const token = localStorage.getItem('authToken')
  try {
    const { id } = params

    if (!id) {
      console.error('ID manquant dans les paramètres de la route.')
      // Retourne un objet vide ou lève une erreur
      throw new Error('ID du psychologue manquant pour le chargement.')
    }

    const res = await fetch(`${apiUrl}/api/users/psychologist/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status}`)
    }

    return data
  } catch (e) {
    if (e instanceof Error) {
      console.error('Erreur de type Error:', e.message)
    } else {
      console.error('Erreur inconnue:', e)
    }
  }
}
