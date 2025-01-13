import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { useStatistics } from "@/hooks/useStatistics"
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns"
import { 
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts"

// Mock data for total statistics
const mockTotalData = {
  dadosGerais: [
    { title: "Total Horas Estudadas", value: "120h" },
    { title: "Média Diária", value: "2.5h" },
    { title: "Total Páginas Lidas", value: "1500" },
    { title: "Média Acertos", value: "75%" }
  ],
  horasEstudo: [
    { name: "Jan", horas: 20 },
    { name: "Fev", horas: 25 },
    { name: "Mar", horas: 30 },
    { name: "Abr", horas: 45 }
  ],
  divisaoEstudos: [
    { name: "Direito", value: 40 },
    { name: "Português", value: 30 },
    { name: "Matemática", value: 20 },
    { name: "Informática", value: 10 }
  ],
  acertosErros: [
    { name: "Direito", acertos: 80, erros: 20 },
    { name: "Português", acertos: 70, erros: 30 },
    { name: "Matemática", acertos: 60, erros: 40 },
    { name: "Informática", acertos: 75, erros: 25 }
  ],
  paginasLidas: [
    { name: "Direito", paginas: 500 },
    { name: "Português", paginas: 400 },
    { name: "Matemática", paginas: 300 },
    { name: "Informática", paginas: 300 }
  ],
  conclusaoEdital: [
    { name: "Direito", concluido: 75 },
    { name: "Português", concluido: 60 },
    { name: "Matemática", concluido: 45 },
    { name: "Informática", concluido: 80 }
  ]
}

// Mock data for evolution statistics
const mockEvolutionData = {
  dadosGerais: [
    { title: "Progresso Total", value: "65%" },
    { title: "Dias Seguidos", value: "15" },
    { title: "Meta Semanal", value: "90%" },
    { title: "Evolução", value: "+15%" }
  ],
  horasEstudoMes: [
    { name: "Jan", horas: 80 },
    { name: "Fev", horas: 95 },
    { name: "Mar", horas: 120 },
    { name: "Abr", horas: 150 }
  ],
  paginasLidasMes: [
    { name: "Jan", paginas: 300 },
    { name: "Fev", paginas: 450 },
    { name: "Mar", paginas: 600 },
    { name: "Abr", paginas: 800 }
  ],
  acertosErrosMes: [
    { name: "Jan", acertos: 65, erros: 35 },
    { name: "Fev", acertos: 70, erros: 30 },
    { name: "Mar", acertos: 75, erros: 25 },
    { name: "Abr", acertos: 80, erros: 20 }
  ]
}

const Estatisticas = () => {
  const { data: studySessions, isLoading } = useStatistics()

  // Calcula o início e fim da semana atual
  const weekStart = startOfWeek(new Date())
  const weekEnd = endOfWeek(new Date())

  // Filtra sessões da semana atual
  const currentWeekSessions = studySessions?.filter(session => 
    session.start_time && isWithinInterval(new Date(session.start_time), {
      start: weekStart,
      end: weekEnd
    })
  ) || []

  // Agrupa horas estudadas por dia da semana
  const hoursPerDay = currentWeekSessions.reduce((acc, session) => {
    if (session.start_time && session.end_time) {
      const day = format(new Date(session.start_time), 'EEE')
      const hours = (new Date(session.end_time).getTime() - new Date(session.start_time).getTime()) / (1000 * 60 * 60)
      acc[day] = (acc[day] || 0) + hours
    }
    return acc
  }, {} as Record<string, number>)

  const weeklyData = [
    { name: 'Seg', horas: hoursPerDay['Mon'] || 0 },
    { name: 'Ter', horas: hoursPerDay['Tue'] || 0 },
    { name: 'Qua', horas: hoursPerDay['Wed'] || 0 },
    { name: 'Qui', horas: hoursPerDay['Thu'] || 0 },
    { name: 'Sex', horas: hoursPerDay['Fri'] || 0 },
    { name: 'Sab', horas: hoursPerDay['Sat'] || 0 },
    { name: 'Dom', horas: hoursPerDay['Sun'] || 0 },
  ]

  // Agrupa páginas lidas por disciplina
  const pagesPerSubject = currentWeekSessions.reduce((acc, session) => {
    if (session.subject && session.pages_read) {
      acc[session.subject] = (acc[session.subject] || 0) + session.pages_read
    }
    return acc
  }, {} as Record<string, number>)

  const subjectsData = Object.entries(pagesPerSubject).map(([name, pages]) => ({
    name,
    paginas: pages
  }))

  // Cores do tema
  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--secondary))',
    'hsl(var(--muted))'
  ]

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center">
        <div className="text-lg">Carregando estatísticas...</div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">ESTATÍSTICAS</h1>
          <AddStudyDialog>
            <Button variant="secondary" size="sm" className="font-medium">
              ADICIONAR ESTUDO
            </Button>
          </AddStudyDialog>
        </div>

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
                  <div className="h-[300px]">
                    <BarChart width={500} height={300} data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="horas" fill="hsl(var(--primary))" />
                    </BarChart>
                  </div>
                </CardContent>
              </Card>

              {/* Páginas Lidas Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PÁGINAS LIDAS POR DISCIPLINA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BarChart width={500} height={300} data={subjectsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis type="number" className="text-muted-foreground" />
                      <YAxis dataKey="name" type="category" className="text-muted-foreground" />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="paginas" fill="hsl(var(--accent))" />
                    </BarChart>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="total" className="space-y-6">
            {/* General Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {mockTotalData.dadosGerais.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Study Hours and Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">HORAS DE ESTUDO (TOTAL)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockTotalData.horasEstudo}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="name" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="horas" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">DIVISÃO ESTUDOS (TOTAL)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockTotalData.divisaoEstudos}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="hsl(var(--primary))"
                          dataKey="value"
                        >
                          {mockTotalData.divisaoEstudos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Hits and Misses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ACERTOS X ERROS POR DISCIPLINA (TOTAL)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockTotalData.acertosErros}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="acertos" stackId="a" fill="hsl(var(--accent))" />
                      <Bar dataKey="erros" stackId="a" fill="hsl(var(--destructive))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Pages Read and Notice Completion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PÁGINAS LIDAS POR DISCIPLINA (TOTAL)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockTotalData.paginasLidas} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis type="number" className="text-muted-foreground" />
                        <YAxis dataKey="name" type="category" className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="paginas" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">CONCLUSÃO EDITAL</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockTotalData.conclusaoEdital}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="hsl(var(--primary))"
                          dataKey="concluido"
                        >
                          {mockTotalData.conclusaoEdital.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Notice Completion by Subject */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CONCLUSÃO DO EDITAL POR DISCIPLINA</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockTotalData.conclusaoEdital}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="concluido" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evolucao" className="space-y-6">
            {/* General Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {mockEvolutionData.dadosGerais.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Study Hours by Month */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">HORAS DE ESTUDO POR MÊS</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockEvolutionData.horasEstudoMes}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="horas" 
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Pages Read by Month */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PÁGINAS LIDAS POR MÊS</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockEvolutionData.paginasLidasMes}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="paginas" 
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Hits and Misses by Month */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ACERTOS X ERROS POR MÊS</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockEvolutionData.acertosErrosMes}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="acertos" fill="hsl(var(--accent))" />
                      <Bar dataKey="erros" fill="hsl(var(--destructive))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Estatisticas
