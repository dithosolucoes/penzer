import { Button } from "@/components/ui/button"
import { Book, Plus } from "lucide-react"

const CicloEstudos = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">CICLO DE ESTUDOS</h1>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            NOVO CICLO
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">1º Ciclo - Em Andamento</h3>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                Ativo
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#E8E8E8]/30 rounded">
                <span className="font-medium">Microbiologia Médica</span>
                <input type="checkbox" className="rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between p-3 bg-[#E8E8E8]/30 rounded">
                <span className="font-medium">Anatomia Humana</span>
                <input type="checkbox" className="rounded border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CicloEstudos