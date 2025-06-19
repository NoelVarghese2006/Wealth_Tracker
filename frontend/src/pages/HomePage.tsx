import { motion } from 'framer-motion'

const HomePage = () => {
  return (
    <div className="bg-green-950 w-full h-[90dvh] max-h-[90dvh] relative">
      <div className="flex w-full h-full items-center justify-center text-center z-10 relative text-6xl">Take Control of Your Money</div>
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-black/60 blur-md z-0"
        animate={{
          opacity: [0.6, 0.3, 0.6],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.img 
      src="/dollar.png" 
      alt="Dollar Sign" 
      className="mx-auto absolute inset-0 size-150 object-cover z-0"
      animate={{
        y: [0, -5, 0], // moves up 5px then back to 0
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }} />
    </div>
  )
}

export default HomePage