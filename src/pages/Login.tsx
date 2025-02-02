import { AuthUI } from "@/components/auth/AuthUI"
import { BookOpen } from "lucide-react"
import { motion } from "framer-motion"

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F2CED0]">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#F2CED0]/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-[#e6b5b7]/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [-100, 0, -100],
          y: [50, 0, 50],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="absolute top-8 left-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="p-2 bg-[#F2CED0] rounded-lg shadow-lg">
            <BookOpen className="w-8 h-8 text-black" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-black to-[#F2CED0] bg-clip-text text-transparent">
            Penzer
          </span>
        </motion.div>
      </div>

      <div className="w-full max-w-[380px] p-6 relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6"
        >
          <h1 className="text-2xl font-bold text-[#1A1F2C] mb-2">
            Bem-vindo a Penzer
          </h1>
          <p className="text-sm text-[#1A1F2C]/70 text-center">
            Sua jornada de estudos começa aqui
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
        >
          <AuthUI />
        </motion.div>
      </div>
    </div>
  )
}

export default Login