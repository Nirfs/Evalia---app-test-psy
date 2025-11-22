import { InputText } from '../InputText'
import { Button } from '../Button'
import type { PatientType } from '../../type/type'
import { createPatient } from '../../Api/authFetch'
import { useState } from 'react'

export function Patients() {
  const [patientEmail, setPatientEmail] = useState('')
  const [patientFirstName, setPatientFirstName] = useState('')
  const [patientLastName, setPatientLastName] = useState('')

  const [patients, setPatients] = useState<PatientType[]>([])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!patientFirstName || !patientLastName || !patientEmail) {
      alert('Tous les champs sont obligatoires')
      return
    }

    try {
      const newPatient = await createPatient(`${patientFirstName} ${patientLastName}`, patientEmail)

      setPatients((prev) => [...prev, newPatient.user])

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
              onChange={(e) => setPatientEmail(e.target.value)}
            />
            <div className="flex gap-10">
              <InputText
                id="FirstName"
                label="Prénom"
                type="text"
                placeholder="Prénom du patient"
                value={patientFirstName}
                onChange={(e) => setPatientFirstName(e.target.value)}
              />
              <InputText
                id="LastName"
                label="Nom"
                type="text"
                placeholder="Nom du patient"
                value={patientLastName}
                onChange={(e) => setPatientLastName(e.target.value)}
              />
            </div>
            <Button type="submit" text="Créer le patient" onClick={handleAdd} />
          </form>
        </div>
      </div>
    </div>
  )
}
