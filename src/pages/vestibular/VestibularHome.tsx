import { Button } from "@/components/ui/button"
import { useState } from "react"
import { format } from "date-fns"
import { BookOpen } from "lucide-react"
import { motion } from "framer-motion"

const VestibularHome = () => {
  const [date] = useState<Date>(new Date())

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">MEU DIA</h1>
          <Button 
            variant="secondary" 
            size="sm"
            type="button"
            className="font-medium"
          >
            ADICIONAR ESTUDO
          </Button>
        </div>

        <div className="space-y-6">
          {/* Tarefas do Dia */}
          <div>
            <h2 className="text-lg font-semibold mb-4">A FAZER HOJE</h2>
            <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8E8E8] text-sm font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">MATEMÁTICA - FUNÇÕES</span>
                      </div>
                      <span className="text-xs text-gray-500">2 HORAS DE ESTUDO</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Próximos Vestibulares */}
          <div>
            <h2 className="text-lg font-semibold mb-4">PRÓXIMOS VESTIBULARES</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between p-3 bg-[#E8E8E8]/30 rounded">
                <span className="font-medium">FUVEST 2024</span>
                <span className="text-sm text-gray-500">{format(date, 'dd/MM/yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VestibularHome