import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const ReviewTable = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">PARA REVISAR HOJE</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Revisão
        </Button>
      </div>
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
  )
}