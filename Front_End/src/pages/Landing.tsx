import PsyImg from '../assets/PsyImg.svg'
import LogoEpsila from '../assets/Logo-EPSYLA.svg'
import { easeInOut, motion } from 'motion/react'
import { Card } from '../components/Card'

export function Landing() {
  return (
    <>
      <section className=" relative flex m-20 gap-10">
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1, ease: easeInOut } }}
          className="flex flex-col max-w-xl items-start gap-4 justify-center"
        >
          <h1 className="text-[2.2rem] font-[Poppins]">
            Passez vos tests <br />
            psychologiques en ligne, en toute sérénité.
          </h1>
          <p className="font-[Inter]">
            Evalia permet aux psychologues de partager leurs tests et de recevoir <br />
            automatiquement les résultats au format PDF.
          </p>
          <button
            className="
          p-8 
          bg-[#1a1a1a]
          text-[#F8F9FA]
          text-sm           
          rounded-lg 
          py-3 
          transition 
          duration-150
          hover:bg-[#252525]
          hover:text-white
          hover:scale-[1.01]
          cursor-pointer 
        "
          >
            Commencer
          </button>
        </motion.div>

        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1, ease: easeInOut } }}
        >
          <img src={PsyImg} className="max-w-[400px]"></img>
        </motion.div>
      </section>
      <section className="w-full flex flex-col items-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
          viewport={{ once: true, amount: 0.9 }}
          className="w-full"
        >
          <h2 id="solution" className="m-30 text-[2.2rem] font-[Poppins] text-center">
            Pourquoi utiliser Evalia
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-20">
          <Card
            time={0.4}
            src="https://plus.unsplash.com/premium_photo-1715588659576-9fb3cd6ceb35?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            text="Passez vos tests en ligne en quelques minutes seulement. Interface intuitive et guidée pour un maximum de confort."
            title="Tests simples et rapides"
          />
          <Card
            time={0.8}
            src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            text="Recevez instantanément les résultats de vos patients au format PDF, prêts à être analysés et archivés facilement."
            title="Résultats PDF automatiques"
          />
          <Card
            time={1.2}
            src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            text="Vos informations personnelles et résultats sont stockés de manière sécurisée et confidentielle, conformément aux normes en vigueur."
            title="Sécurité et confidentialité"
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center mb-40">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
          viewport={{ once: true, amount: 0.4 }}
          className="w-full"
        >
          <h2 id="solution" className="m-30 text-[2.2rem] font-[Poppins] text-center">
            Qui sommes-nous ?
          </h2>
        </motion.div>
        <div className="flex gap-10 mb-20 items-center">
          <a target="_blank" href="https://www.epsyla.com/">
            <img src={LogoEpsila} className="max-w-[400px]" />
          </a>
          <div className="flex flex-col max-w-xl items-start gap-4 justify-center">
            <h1 id="qui" className="text-[2.2rem] font-[Poppins]">
              Pôle de Thérapie Comportementale et Cognitive à Caen
            </h1>
            <p className="font-[Inter]">
              Psychothérapies comportementales et cognitives individuelles ou en groupe, formations
              et supervisions. Nous sommes ravis de vous accueillir sur notre site. L'expérience et
              le professionnalisme reconnus de toute l'équipe d'Epsyla est au service de nos
              patients, avec pour seul objectif de répondre à leurs attentes.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
