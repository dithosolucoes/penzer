import { Button } from "@/components/ui/button"
import { BookOpen, Plus } from "lucide-react"

const VestibularHome = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">ÁREA DO VESTIBULANDO</h1>
          <Button 
            variant="secondary" 
            size="sm"
            type="button"
            className="font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADICIONAR MATÉRIA
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Próximos Vestibulares */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Próximos Vestibulares
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#F2CED0]/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">FUVEST 2024</span>
                  <span className="text-sm text-gray-500">28/11/2024</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">1ª Fase</p>
              </div>
              <div className="p-4 bg-[#F2CED0]/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">UNICAMP 2024</span>
                  <span className="text-sm text-gray-500">05/12/2024</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">1ª Fase</p>
              </div>
            </div>
          </div>

          {/* Desempenho Recente */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Desempenho Recente</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#E8E8E8]/30 rounded">
                <span>Matemática</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#E8E8E8]/30 rounded">
                <span>Física</span>
                <span className="font-medium text-yellow-600">75%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#E8E8E8]/30 rounded">
                <span>Química</span>
                <span className="font-medium text-red-600">65%</span>
              </div>
            </div>
          </div>

          {/* Próximas Atividades */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Próximas Atividades</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#E8E8E8]/30 rounded">
                <div className="flex-1">
                  <p className="font-medium">Simulado FUVEST</p>
                  <p className="text-sm text-gray-500">Domingo, 10:00</p>
                </div>
                <Button variant="outline" size="sm">Ver</Button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#E8E8E8]/30 rounded">
                <div className="flex-1">
                  <p className="font-medium">Redação</p>
                  <p className="text-sm text-gray-500">Segunda, 14:00</p>
                </div>
                <Button variant="outline" size="sm">Ver</Button>
              </div>
            </div>
          </div>

          {/* Metas de Estudo */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Metas de Estudo</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#E8E8E8]/30 rounded">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Resolver 30 exercícios de Matemática</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#E8E8E8]/30 rounded">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Fazer resumo de Literatura</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#E8E8E8]/30 rounded">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Praticar redação tema ENEM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VestibularHome