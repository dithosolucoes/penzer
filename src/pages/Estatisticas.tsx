import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"

// Mock data for total statistics
const mockTotalData = [
  { name: 'Jan', total: 4 },
  { name: 'Feb', total: 3 },
  { name: 'Mar', total: 2 },
  { name: 'Apr', total: 6 },
  { name: 'May', total: 8 },
  { name: 'Jun', total: 7 },
];

// Mock data for evolution statistics
const mockEvolutionData = [
  { name: 'Week 1', value: 4 },
  { name: 'Week 2', value: 3 },
  { name: 'Week 3', value: 5 },
  { name: 'Week 4', value: 7 },
];

const Estatisticas = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Estatísticas de Estudo</h2>
        
        {/* Total Study Hours */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Total de Horas Estudadas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockTotalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Distribuição por Disciplina</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockTotalData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Evolução Semanal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Estatisticas