import { Outlet } from 'react-router-dom'
import { Header } from '../components/Layout/Header'
import { Footer } from '../components/Layout/Footer'
import FondV from '../assets/Union.svg'
import FondH from '../assets/Union2.svg'
export default function LandingLayout() {
  return (
    <>
      <img className="absolute top-0 right-0 -z-20" src={FondV}></img>
      <img className="absolute left-0 top-150 -z-20" src={FondH}></img>
      <Header />
      <main className="flex flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
