import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-[#101010] text-[#F8F9FA] font-[Inter]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oups ! La page que vous recherchez n'existe pas.</p>

      <NavLink
        to="/"
        className="bg-blue-950 text-white text-sm rounded-sm p-3 hover:bg-blue-900 transition"
      >
        Retour à l'accueil
      </NavLink>
    </section>
  )
}
