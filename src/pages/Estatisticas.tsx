import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddStudyDialog } from "@/components/AddStudyDialog"
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

  // Mock data for total performance
  const mockTotalData = {
    dadosGerais: [
      { title: "Total de Horas", value: "120h" },
      { title: "Média Diária", value: "4h" },
      { title: "Páginas Lidas", value: "450" },
      { title: "Média de Acertos", value: "75%" }
    ],
    horasEstudo: [
      { name: 'Anatomia', horas: 40 },
      { name: 'Fisiologia', horas: 30 },
      { name: 'Bioquímica', horas: 25 },
      { name: 'Histologia', horas: 25 },
    ],
    divisaoEstudos: [
      { name: 'Anatomia', value: 35 },
      { name: 'Fisiologia', value: 25 },
      { name: 'Bioquímica', value: 20 },
      { name: 'Histologia', value: 20 },
    ],
    acertosErros: [
      { name: 'Anatomia', acertos: 80, erros: 20 },
      { name: 'Fisiologia', acertos: 75, erros: 25 },
      { name: 'Bioquímica', acertos: 70, erros: 30 },
      { name: 'Histologia', acertos: 85, erros: 15 },
    ],
    paginasLidas: [
      { name: 'Anatomia', paginas: 150 },
      { name: 'Fisiologia', paginas: 120 },
      { name: 'Bioquímica', paginas: 90 },
      { name: 'Histologia', paginas: 90 },
    ],
    conclusaoEdital: [
      { name: 'Anatomia', concluido: 75 },
      { name: 'Fisiologia', concluido: 60 },
      { name: 'Bioquímica', concluido: 45 },
      { name: 'Histologia', concluido: 55 },
    ]
  }

  // Mock data for evolution tab
  const mockEvolutionData = {
    dadosGerais: [
      { title: "Total de Horas", value: "480h" },
      { title: "Média Mensal", value: "120h" },
      { title: "Total Páginas", value: "1800" },
      { title: "Média Acertos", value: "78%" }
    ],
    horasEstudoMes: [
      { name: 'Jan', horas: 100 },
      { name: 'Fev', horas: 120 },
      { name: 'Mar', horas: 90 },
      { name: 'Abr', horas: 150 },
    ],
    paginasLidasMes: [
      { name: 'Jan', paginas: 400 },
      { name: 'Fev', paginas: 450 },
      { name: 'Mar', paginas: 380 },
      { name: 'Abr', paginas: 570 },
    ],
    acertosErrosMes: [
      { name: 'Jan', acertos: 75, erros: 25 },
      { name: 'Fev', acertos: 80, erros: 20 },
      { name: 'Mar', acertos: 73, erros: 27 },
      { name: 'Abr', acertos: 85, erros: 15 },
    ]
  }

  // Updated color palette using project colors
  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--secondary))',
    'hsl(var(--muted))'
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">ESTATÍSTICAS</h1>
          <AddStudyDialog>
            <Button 
              variant="secondary" 
              size="sm"
              className="font-medium"
            >
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
                  <ChartContainer className="h-[300px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockData.horasEstudadas}>
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
                          fill="hsl(var(--primary))"
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
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis type="number" className="text-muted-foreground" />
                        <YAxis dataKey="name" type="category" className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="horas" fill="hsl(var(--accent))" />
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
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="name" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="paginas" 
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
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