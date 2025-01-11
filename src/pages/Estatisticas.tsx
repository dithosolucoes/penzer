import { BarChart2 } from "lucide-react"

const Estatisticas = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">ESTATÍSTICAS</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm text-gray-500 mb-2">Horas Estudadas (Total)</h3>
            <p className="text-2xl font-bold">124h</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm text-gray-500 mb-2">Média Diária</h3>
            <p className="text-2xl font-bold">4h 30min</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm text-gray-500 mb-2">Páginas Lidas</h3>
            <p className="text-2xl font-bold">856</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm text-gray-500 mb-2">Revisões Concluídas</h3>
            <p className="text-2xl font-bold">42</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Estatisticas