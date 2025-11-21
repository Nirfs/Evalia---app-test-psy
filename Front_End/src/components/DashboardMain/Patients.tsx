import { useEffect, useState } from 'react'
import { TestSelector } from '../TestSelector'
import { InputText } from '../InputText'
import { Button } from '../Button'
import { getPatient } from '../../Api/patientfetch'
import type { PatientType } from '../../type/type'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FaTrashAlt } from 'react-icons/fa'

export function Patients() {
  const testList = ['Mini', 'Inventaire de Dépression de Beck', 'Test de QI', 'Test de machin truc']
  const [selectedTests, setSelectedTests] = useState<string[]>([])

  const [patientEmail, setPatientEmail] = useState('')
  const [patientFirstName, setPatientFirstName] = useState('')
  const [patientLastName, setPatientLastName] = useState('')

  const [patients, setPatients] = useState<PatientType[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const fetchPatient = async () => {
      const data = await getPatient()
      setPatients(data)
    }
    fetchPatient()
  }, [])

  const handleCheckbox = (test: string) => {
    setSelectedTests((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    )
  }
  const handleDelete = (id: number) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id))
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    const newPatient = {
      id: patients.length + 1,
      firstName: patientFirstName,
      lastName: patientLastName,
      email: patientEmail,
      dateOfBirth: '01.01.01',
      phone: '+9669654115',
      registeredAt: new Date().toISOString(),
      testsAssigned: selectedTests,
    }

    setPatients((prev) => [...prev, newPatient])
    setPatientEmail('')
    setPatientFirstName('')
    setPatientLastName('')
    console.log(newPatient)
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

            <TestSelector
              testList={testList}
              selectedTests={selectedTests}
              onSelect={handleCheckbox}
            />
            <Button type="submit" text="Créer le patient" onClick={handleAdd} />
          </form>
        </div>
        <div className="shadow-xl/30 w-xl flex flex-col mx-auto p-10 gap-3">
          <h3 className="font-bold font-[Inter]">Liste des Patient</h3>
          <ul className="flex flex-col gap-5">
            {patients.map((patient) => (
              <li className="flex gap-4" key={patient.id}>
                <button
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredId(patient.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleDelete(patient.id)}
                >
                  {hoveredId === patient.id ? <FaTrashAlt /> : <FaRegTrashCan />}
                </button>
                <div>
                  {patient.firstName} {patient.lastName} - {patient.registeredAt}
                  <h4 className="font-bold ">Test passé ou à passé</h4>
                  {patient.testsAssigned.map((test) => (
                    <p key={test}>- {test}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
