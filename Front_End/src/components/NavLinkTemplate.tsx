import { NavLink } from 'react-router-dom'

type NavLinkType = {
  to: string
  text: string
  icon: React.ElementType
  iconActive: React.ElementType
}

export function NavLinkTemplate({ to, text, icon: Icon, iconActive: IconActive }: NavLinkType) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center py-2 font-medium rounded-lg transition duration-150 hover:text-[#F8F9FA] ${
          isActive ? 'text-[#F8F9FA] font-semibold' : 'text-gray-300'
        }`
      }
    >
      {({ isActive }) => {
        const CurrentIcon = isActive ? IconActive : Icon

        return (
          <div className="flex items-center">
            <span
              className={`w-1 h-6 rounded-r-md mr-5 ${isActive ? 'bg-[#0061EF]' : 'bg-auto'}`}
            />

            <span className="flex items-center gap-2">
              {CurrentIcon && <CurrentIcon size={20} />}
              {text}
            </span>
          </div>
        )
      }}
    </NavLink>
  )
}
