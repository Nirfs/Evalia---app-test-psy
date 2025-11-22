import type { Psychologist } from '../../type/type.js'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function Acceuil() {
  const thérapeute = useOutletContext<Psychologist>()
  return (
    <>
      <div className="font-[Inter] p-5">
        <h2 className="text-3xl font-bold">Bienvenue {thérapeute.user.name}</h2>
        <Link to={'../patients'}>Aller a la liste des patient &gt;</Link>
      </div>
    </>
  )
}
