import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"

const EditalVerticalizado = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">EDITAL VERTICALIZADO</h1>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADICIONAR EDITAL
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-gray-500" />
              <h3 className="font-semibold">Residência Médica 2024</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total de Disciplinas: 12</p>
              <p className="text-sm text-gray-600">Progresso: 25%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#F2CED0] h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditalVerticalizado