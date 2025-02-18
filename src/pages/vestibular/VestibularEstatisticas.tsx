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

const mockTimeData = [
  { name: 'Segunda', horas: 4 },
  { name: 'Terça', horas: 3 },
  { name: 'Quarta', horas: 2 },
  { name: 'Quinta', horas: 6 },
  { name: 'Sexta', horas: 5 },
  { name: 'Sábado', horas: 4 },
  { name: 'Domingo', horas: 2 },
]

const mockSubjectsData = [
  { name: 'Matemática', value: 30 },
  { name: 'Português', value: 25 },
  { name: 'Física', value: 20 },
  { name: 'Química', value: 15 },
  { name: 'Biologia', value: 10 },
]

// Cores do branding
const COLORS = ['#F2CED0', '#E8E8E8', '#000000', '#F2CED0', '#E8E8E8'].map(color => 
  color === '#F2CED0' ? '#F2CED0' : 
  color === '#E8E8E8' ? '#E8E8E8' : 
  '#000000'
)

const VestibularEstatisticas = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">ESTATÍSTICAS</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
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
          <h2 className="text-lg font-semibold mb-4">Distribuição por Matéria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockSubjectsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#F2CED0"
                dataKey="value"
              >
                {mockSubjectsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Progresso nas Revisões</h2>
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

export default VestibularEstatisticas