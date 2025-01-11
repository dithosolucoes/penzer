import { Button } from "@/components/ui/button"
import { BookOpen, Plus, Home, History, FileText, BarChart2, Book } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">MEU DIA</h1>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADICIONAR ESTUDO
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks Section */}
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
                      <span className="text-xs text-gray-500">VER ONDE PAREI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Cycle Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">MEU CICLO DE ESTUDOS</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between p-3 bg-[#E8E8E8]/30 rounded">
                <span className="font-medium">MICROBIOLOGIA MÉDICA</span>
                <input type="checkbox" className="rounded border-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">PARA REVISAR HOJE</h2>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#E8E8E8]/30">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">DATA</th>
                  <th className="px-4 py-3 text-left font-medium">EDITAL</th>
                  <th className="px-4 py-3 text-left font-medium">DISCIPLINA/CAPÍTULO</th>
                  <th className="px-4 py-3 text-left font-medium">ASSUNTOS</th>
                  <th className="px-4 py-3 text-left font-medium">HISTÓRICO DE REVISÕES</th>
                  <th className="px-4 py-3 text-left font-medium">PÁG. LIDAS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3" colSpan={6}>
                    Nenhuma revisão programada para hoje
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index