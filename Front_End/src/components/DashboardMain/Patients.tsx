import { InputText } from '../Input/InputText'
import { Button } from '../Input/Button'
import type { PatientType } from '../../type/type'
import { createPatient } from '../../Api/authFetch'
import { useState } from 'react'
import { handleChange } from '../HandleChange'
import { IoTrashOutline } from 'react-icons/io5'
import { IoTrash } from 'react-icons/io5'
import { useLoaderData } from 'react-router-dom'
import { IoAlbums } from 'react-icons/io5'
import { IoAlbumsOutline } from 'react-icons/io5'

export function Patients() {
  const [patientEmail, setPatientEmail] = useState('')
  const [patientFirstName, setPatientFirstName] = useState('')
  const [patientLastName, setPatientLastName] = useState('')

  const { patients } = useLoaderData() as { patients: PatientType[] } // ← ici le nom exact
  const [patientsList, setPatientsList] = useState<PatientType[]>(patients || [])

  const [hoveredTrashId, setHoveredTrashId] = useState<number | null>(null)
  const [hoveredAlbumId, setHoveredAlbumId] = useState<number | null>(null)
  const handleAdd = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (!patientFirstName || !patientLastName || !patientEmail) {
      alert('Tous les champs sont obligatoires')
      return
    }

    try {
      const newPatient = await createPatient(`${patientFirstName} ${patientLastName}`, patientEmail)

      setPatientsList((prev) => [...prev, newPatient.user])

      setPatientEmail('')
      setPatientFirstName('')
      setPatientLastName('')
    } catch (err) {
      console.error('Erreur création patient:', err)
      alert(err instanceof Error ? err.message : 'Erreur réseau')
    }
  }

  return (
    <div className="font-[Inter] p-20">
      <h2 className="text-3xl font-bold mb-4">Mes patients</h2>
      <div className="flex flex-col gap-10">
        <div className="shadow-xl/30 w-xl flex justify-center mx-auto mt-20">
          <form className="p-8">
            <InputText
              id="patientEmail"
              label="Ajouter un patient"
              type="email"
              placeholder="Adresse email du patient"
              value={patientEmail}
              onChange={handleChange(setPatientEmail)}
            />
            <div className="flex gap-10">
              <InputText
                id="FirstName"
                label="Prénom"
                type="text"
                placeholder="Prénom du patient"
                value={patientFirstName}
                onChange={handleChange(setPatientFirstName)}
              />
              <InputText
                id="LastName"
                label="Nom"
                type="text"
                placeholder="Nom du patient"
                value={patientLastName}
                onChange={handleChange(setPatientLastName)}
              />
            </div>
            <Button type="submit" text="Créer le patient" onClick={handleAdd} />
          </form>
        </div>
      </div>
      {patients.length > 0 ? (
        <div className="mt-10 shadow-xl/30 w-xl mx-auto p-8">
          <h3 className="text-2xl font-bold mb-4">Liste des patients</h3>
          <ul className="flex flex-col gap-2">
            {patientsList.map((patient) => (
              <li
                key={patient.id}
                className="flex justify-between items-center py-2 px-3 border rounded-md"
              >
                <span>
                  {patient.firstName} {patient.lastName} – {patient.email}
                </span>

                <div className="flex gap-4">
                  <div
                    className="cursor-pointer scale-150"
                    onMouseEnter={() => setHoveredTrashId(patient.id)}
                    onMouseLeave={() => setHoveredTrashId(null)}
                  >
                    {hoveredTrashId === patient.id ? <IoTrashOutline /> : <IoTrash />}
                  </div>
                  <div
                    className="cursor-pointer scale-150"
                    onMouseEnter={() => setHoveredAlbumId(patient.id)}
                    onMouseLeave={() => setHoveredAlbumId(null)}
                  >
                    {hoveredAlbumId === patient.id ? <IoAlbumsOutline /> : <IoAlbums />}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-10 text-center text-gray-500">Aucun patient enregistré pour le moment.</p>
      )}
    </div>
  )
}
