export type Psychologist = {
  id: number
  user: {
    id: number
    name: string
    email: string
    createdAt: string | Date
  }
  patients?: { id: number }[]
}

export type InputTextProps = {
  id: string
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  text: string
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type PatientType = {
  id: number
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  phone: string
  registeredAt: string
  testsAssigned: string[]
}
