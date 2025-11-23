import { HashLink } from 'react-router-hash-link'

type HashLinkType = {
  text: string
  to: string
}
export function HashLinkTemplate({ text, to }: HashLinkType) {
  return (
    <HashLink className="hover:text-[#00C853]" smooth to={to}>
      {text}
    </HashLink>
  )
}
