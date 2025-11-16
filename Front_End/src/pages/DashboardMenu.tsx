import { Link } from 'react-router-dom' // Importé pour simuler des liens

export default function DashboardMenu() {
  return (
    <aside className="w-64 bg-blue-950 text-white flex flex-col p-4 shadow-xl">
      {/* Titre/Logo du Dashboard */}
      <div className="text-2xl font-bold mb-8 p-2 border-b border-blue-800">Evalia Pro 🧠</div>

      {/* Liens de Navigation */}
      <nav className="grow">
        <ul className="space-y-2">
          <li>
            {/* Utilise Link de React Router pour la navigation */}
            <Link
              to="acceuil"
              className="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-800 transition duration-150"
            >
              <span className="mr-3">🏠</span> Accueil
            </Link>
          </li>

          <li>
            <Link
              to="testlist"
              className="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-800 transition duration-150"
            >
              <span className="mr-3">📋</span> Liste des Tests
            </Link>
          </li>

          <li>
            <Link
              to="patients"
              className="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-800 transition duration-150"
            >
              <span className="mr-3">🧑‍🤝‍🧑</span> Mes Patients
            </Link>
          </li>

          <li>
            <Link
              to="profile"
              className="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-800 transition duration-150"
            >
              <span className="mr-3">⚙️</span> Profil & Paramètres
            </Link>
          </li>
        </ul>
      </nav>

      {/* Lien de Déconnexion (en bas) */}
      <div className="mt-auto pt-4 border-t border-blue-800">
        <Link
          to="/logout"
          className="flex items-center p-3 text-lg font-medium text-red-300 hover:bg-blue-800 rounded-lg transition duration-150"
        >
          <span className="mr-3">🚪</span> Déconnexion
        </Link>
      </div>
    </aside>
  )
}
