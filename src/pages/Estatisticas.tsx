import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

const Estatisticas = () => {
  // Mock data - replace with real data later
  const mockData = {
    horasEstudadas: [
      { name: 'Seg', horas: 4 },
      { name: 'Ter', horas: 3 },
      { name: 'Qua', horas: 5 },
      { name: 'Qui', horas: 2 },
      { name: 'Sex', horas: 4 },
      { name: 'Sab', horas: 6 },
      { name: 'Dom', horas: 3 },
    ],
    divisaoEstudos: [
      { name: 'Anatomia', value: 30 },
      { name: 'Fisiologia', value: 25 },
      { name: 'Bioquímica', value: 20 },
      { name: 'Histologia', value: 25 },
    ],
    disciplinasHoras: [
      { name: 'Anatomia', horas: 8 },
      { name: 'Fisiologia', horas: 6 },
      { name: 'Bioquímica', horas: 4 },
      { name: 'Histologia', horas: 5 },
    ],
    paginasLidas: [
      { name: 'Seg', paginas: 20 },
      { name: 'Ter', paginas: 15 },
      { name: 'Qua', paginas: 25 },
      { name: 'Qui', paginas: 10 },
      { name: 'Sex', paginas: 30 },
      { name: 'Sab', paginas: 20 },
      { name: 'Dom', paginas: 15 },
    ],
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">ESTATÍSTICAS</h1>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
          >
            ADICIONAR ESTUDO
          </Button>
        </div>

        {/* Performance Tabs */}
        <Tabs defaultValue="semanal" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="semanal">DESEMPENHO SEMANA ATUAL</TabsTrigger>
            <TabsTrigger value="total">DESEMPENHO TOTAL</TabsTrigger>
            <TabsTrigger value="evolucao">EVOLUÇÃO</TabsTrigger>
          </TabsList>

          <TabsContent value="semanal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Horas Estudadas Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">HORAS ESTUDADAS (SEMANA ATUAL)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockData.horasEstudadas}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="horas" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Divisão Estudos Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">DIVISÃO ESTUDOS (SEMANA ATUAL)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockData.divisaoEstudos}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {mockData.divisaoEstudos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Disciplinas x Horas Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">DISCIPLINAS X HORAS DE ESTUDO (SEMANA ATUAL)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockData.disciplinasHoras} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="horas" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Páginas Lidas Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PÁGINAS LIDAS (SEMANA ATUAL)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData.paginasLidas}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="paginas" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="total">
            {/* Will be implemented in the next step */}
            <div className="text-center py-8 text-muted-foreground">
              Desempenho Total será implementado no próximo passo
            </div>
          </TabsContent>

          <TabsContent value="evolucao">
            {/* Will be implemented in the next step */}
            <div className="text-center py-8 text-muted-foreground">
              Evolução será implementada no próximo passo
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Estatisticas