import { motion } from 'framer-motion'

type CardProps = {
  src: string
  title: string
  text: string
  time?: number
}

export function Card({ src, title, text, time = 0.8 }: CardProps) {
  return (
    <motion.div
      className="rounded-3xl max-w-[350px] shadow-xl mb-[30px] overflow-hidden"
      initial={{ y: 100, opacity: 0, scale: 1 }}
      whileHover={{ scale: 1.05, transition: { type: 'spring', bounce: 0.25 } }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { duration: time, ease: 'easeInOut' },
      }}
      viewport={{ once: true }}
    >
      <img className="object-cover w-full h-[200px] rounded-t-3xl" src={src} alt={title} />

      <div className="flex flex-col gap-3 p-6">
        <h3 style={{ fontFamily: 'Poppins, sans-serif' }} className="font-bold text-lg">
          {title}
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">
          {text}
        </p>
      </div>
    </motion.div>
  )
}
