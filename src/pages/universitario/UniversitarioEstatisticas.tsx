import { Card } from "@/components/ui/card"
import { Statistics } from "@/components/admin/Statistics"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts'

const mockTimeData = [
  { name: 'Segunda', horas: 4 },
  { name: 'Terça', horas: 3 },
  { name: 'Quarta', horas: 2 },
  { name: 'Quinta', horas: 6 },
  { name: 'Sexta', horas: 5 },
  { name: 'Sábado', horas: 4 },
  { name: 'Domingo', horas: 2 },
]

const UniversitarioEstatisticas = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">ESTATÍSTICAS</h1>
      
      <Statistics />

      <div className="grid gap-6 mt-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Horas de Estudo por Dia</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="horas" fill="#F2CED0" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Evolução do Desempenho</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="horas" 
                stroke="#F2CED0" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

export default UniversitarioEstatisticas