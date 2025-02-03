import { Button } from "@/components/ui/button"
import { useState } from "react"
import { format } from "date-fns"
import { BookOpen, Plus } from "lucide-react"

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
            <Plus className="w-4 h-4 mr-2" />
            ADICIONAR ESTUDO
          </Button>
        </div>

        <div className="space-y-6">
          {/* A Fazer Hoje */}
          <div>
            <h2 className="text-lg font-semibold mb-4">A FAZER HOJE</h2>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8E8E8] text-sm font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">MICROBIOLOGIA MÉDICA</span>
                      </div>
                      <span className="text-xs text-gray-500">2 HORAS DE ESTUDO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meu Ciclo de Estudos */}
          <div>
            <h2 className="text-lg font-semibold mb-4">MEU CICLO DE ESTUDOS</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="font-medium">MICROBIOLOGIA MÉDICA</span>
              </div>
            </div>
          </div>

          {/* Para Revisar Hoje */}
          <div>
            <h2 className="text-lg font-semibold mb-4">PARA REVISAR HOJE</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-gray-500">
                      <th className="text-left py-2">DATA</th>
                      <th className="text-left py-2">EDITAL</th>
                      <th className="text-left py-2">DISCIPLINA/CAPÍTULO</th>
                      <th className="text-left py-2">ASSUNTOS</th>
                      <th className="text-left py-2">HISTÓRICO DE REVISÕES</th>
                      <th className="text-left py-2">PÁG. LIDAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">{format(date, "dd/MM/yyyy")}</td>
                      <td className="py-2">FUVEST 2024</td>
                      <td className="py-2">Microbiologia</td>
                      <td className="py-2">Bactérias e Vírus</td>
                      <td className="py-2">2/4</td>
                      <td className="py-2">15-30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VestibularHome