import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"

const Editais = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">EDITAIS</h1>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADICIONAR EDITAL
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-gray-500" />
                <div>
                  <h3 className="font-semibold">Residência Médica 2024</h3>
                  <p className="text-sm text-gray-500">Hospital das Clínicas - USP</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Ver Detalhes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editais