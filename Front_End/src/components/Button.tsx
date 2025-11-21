import type { ButtonProps } from '../type/type'

export function Button({ type, text, loading, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="
        w-full 
        bg-[#1a1a1a]
        text-[#F8F9FA]
        text-sm 
        
        rounded-lg 
        py-3 
        mt-7 
        transition 
        duration-150
        hover:bg-[#252525]
        hover:text-white
        active:scale-[0.98]
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500/50
        cursor-pointer 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        disabled:hover:bg-[#1a1a1a]
        shadow-lg
      "
    >
      {loading ? 'En cours...' : text}
    </button>
  )
}
