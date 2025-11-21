export async function getPatient() {
  try {
    const res = await fetch('/data/data.json')
    if (!res.ok) throw new Error('Erreur lors du chargement des patients')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
