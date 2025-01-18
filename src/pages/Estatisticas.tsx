import { Card } from "@/components/ui/card"
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
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Mock data for the charts
const mockTotalData = [
  { name: 'Jan', total: 4 },
  { name: 'Fev', total: 3 },
  { name: 'Mar', total: 2 },
  { name: 'Abr', total: 6 },
  { name: 'Mai', total: 8 },
  { name: 'Jun', total: 4 },
]

const mockEvolutionData = [
  { name: 'Semana 1', horas: 2 },
  { name: 'Semana 2', horas: 4 },
  { name: 'Semana 3', horas: 3 },
  { name: 'Semana 4', horas: 6 },
]

const Estatisticas = () => {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">Total de Horas Estudadas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockTotalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Evolução Semanal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockEvolutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="horas" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Distribuição de Tópicos Estudados</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockTotalData}
              dataKey="total"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {mockTotalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default Estatisticas
