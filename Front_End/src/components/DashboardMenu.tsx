import { NavLinkTemplate } from './NavLinkTemplate'
import {
  IoHomeOutline,
  IoHome,
  IoCreateOutline,
  IoCreate,
  IoPersonOutline,
  IoPerson,
  IoFolderOpen,
  IoFolderOpenOutline,
  IoSettingsOutline,
  IoSettings,
} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

export default function DashboardMenu() {
  return (
    <aside className="w-50 bg-[#101010] hover:text-blue flex flex-col shadow-xl patients py-5">
      <h1 className="text-xl font-[Inter] pb-5 text-[#F8F9FA] px-3 border-b-2 border-gray-600 mx-2">
        🧠 Evalia Pro
      </h1>
      <nav className="flex flex-col justify-between h-full mt-4">
        <ul className="flex flex-col gap-1">
          <li>
            <NavLinkTemplate to="acceuil" text="Accueil" icon={IoHomeOutline} iconActive={IoHome} />
          </li>
          <li>
            <NavLinkTemplate to="test" text="Test" icon={IoCreateOutline} iconActive={IoCreate} />
          </li>
          <li>
            <NavLinkTemplate
              to="patients"
              text="Patients"
              icon={IoPersonOutline}
              iconActive={IoPerson}
            />
          </li>
          <li>
            <NavLinkTemplate
              to="notes"
              text="Notes"
              icon={IoFolderOpenOutline}
              iconActive={IoFolderOpen}
            />
          </li>
          <li>
            <NavLinkTemplate
              to="reglage"
              text="Réglages"
              icon={IoSettingsOutline}
              iconActive={IoSettings}
            />
          </li>
        </ul>

        <div className="py-4 flex flex-col items-center">
          <NavLink
            to={'/register'}
            className={
              'w-full flex items-center py-2 px-7 font-medium rounded-lg transition duration-150 hover:text-[#F8F9FA]'
            }
          >
            Créer un compte{' '}
          </NavLink>
          <NavLink
            to={'/'}
            className={
              'w-full flex items-center py-2 px-7 font-medium rounded-lg transition duration-150 hover:text-[#F8F9FA]'
            }
          >
            Se connecter
          </NavLink>
        </div>
      </nav>
    </aside>
  )
}
