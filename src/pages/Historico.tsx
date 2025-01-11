import { Button } from "@/components/ui/button"
import { History } from "lucide-react"

const Historico = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">HISTÓRICO</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#E8E8E8]/30">
              <tr>
                <th className="px-4 py-3 text-left font-medium">DATA</th>
                <th className="px-4 py-3 text-left font-medium">DISCIPLINA</th>
                <th className="px-4 py-3 text-left font-medium">CAPÍTULO</th>
                <th className="px-4 py-3 text-left font-medium">TEMPO DE ESTUDO</th>
                <th className="px-4 py-3 text-left font-medium">PÁGINAS LIDAS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">10/03/2024</td>
                <td className="px-4 py-3">Microbiologia Médica</td>
                <td className="px-4 py-3">Capítulo 1</td>
                <td className="px-4 py-3">2h 30min</td>
                <td className="px-4 py-3">25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Historico