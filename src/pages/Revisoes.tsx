import { Button } from "@/components/ui/button"
import { BookOpen, Plus } from "lucide-react"

const Revisoes = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">REVISÕES</h1>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADICIONAR REVISÃO
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#E8E8E8]/30">
              <tr>
                <th className="px-4 py-3 text-left font-medium">DATA</th>
                <th className="px-4 py-3 text-left font-medium">DISCIPLINA</th>
                <th className="px-4 py-3 text-left font-medium">CAPÍTULO</th>
                <th className="px-4 py-3 text-left font-medium">CICLO</th>
                <th className="px-4 py-3 text-left font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">15/03/2024</td>
                <td className="px-4 py-3">Microbiologia Médica</td>
                <td className="px-4 py-3">Capítulo 1</td>
                <td className="px-4 py-3">1º Ciclo</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Pendente</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Revisoes