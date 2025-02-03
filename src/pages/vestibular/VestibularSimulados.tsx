import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TestTube, Timer, Award, ChartBar } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Tipos
type Simulado = {
  id: string
  titulo: string
  materia: string
  tipo: "geral" | "especifico"
  questoes: number
  duracao: number
  status: "pendente" | "em_andamento" | "concluido"
  nota?: number
}

const simuladosMock: Simulado[] = [
  {
    id: "1",
    titulo: "Simulado Geral ENEM",
    materia: "Geral",
    tipo: "geral",
    questoes: 90,
    duracao: 180,
    status: "pendente"
  },
  {
    id: "2",
    titulo: "Matemática Básica",
    materia: "Matemática",
    tipo: "especifico",
    questoes: 30,
    duracao: 60,
    status: "concluido",
    nota: 8.5
  },
  {
    id: "3",
    titulo: "Física - Mecânica",
    materia: "Física",
    tipo: "especifico",
    questoes: 25,
    duracao: 45,
    status: "em_andamento"
  },
  {
    id: "4",
    titulo: "Química Orgânica",
    materia: "Química",
    tipo: "especifico",
    questoes: 20,
    duracao: 40,
    status: "concluido",
    nota: 7.0
  }
]

const VestibularSimulados = () => {
  const [filtroMateria, setFiltroMateria] = useState<string>("todos")
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [busca, setBusca] = useState("")

  const simuladosFiltrados = simuladosMock.filter(simulado => {
    const matchMateria = filtroMateria === "todos" || simulado.materia === filtroMateria
    const matchTipo = filtroTipo === "todos" || simulado.tipo === filtroTipo
    const matchBusca = simulado.titulo.toLowerCase().includes(busca.toLowerCase())
    return matchMateria && matchTipo && matchBusca
  })

  const getStatusColor = (status: Simulado["status"]) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-500"
      case "em_andamento":
        return "bg-blue-500"
      case "concluido":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Simulado["status"]) => {
    switch (status) {
      case "pendente":
        return "Pendente"
      case "em_andamento":
        return "Em Andamento"
      case "concluido":
        return "Concluído"
      default:
        return status
    }
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">SIMULADOS</h1>
        
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <TestTube className="h-4 w-4 text-[#F2CED0]" />
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Total Simulados</p>
                  <p className="text-2xl font-bold">{simuladosMock.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#F2CED0]" />
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Concluídos</p>
                  <p className="text-2xl font-bold">
                    {simuladosMock.filter(s => s.status === "concluido").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-[#F2CED0]" />
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold">
                    {simuladosMock.filter(s => s.status === "em_andamento").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <ChartBar className="h-4 w-4 text-[#F2CED0]" />
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">Média Geral</p>
                  <p className="text-2xl font-bold">
                    {(simuladosMock
                      .filter(s => s.nota)
                      .reduce((acc, curr) => acc + (curr.nota || 0), 0) / 
                      simuladosMock.filter(s => s.nota).length
                    ).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Buscar simulados..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="md:w-1/3"
          />
          
          <Select
            value={filtroMateria}
            onValueChange={setFiltroMateria}
          >
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Filtrar por matéria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas as matérias</SelectItem>
              <SelectItem value="Geral">Geral</SelectItem>
              <SelectItem value="Matemática">Matemática</SelectItem>
              <SelectItem value="Física">Física</SelectItem>
              <SelectItem value="Química">Química</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filtroTipo}
            onValueChange={setFiltroTipo}
          >
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="geral">Geral</SelectItem>
              <SelectItem value="especifico">Específico</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de Simulados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {simuladosFiltrados.map((simulado) => (
            <Card key={simulado.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{simulado.titulo}</CardTitle>
                    <CardDescription>{simulado.materia}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(simulado.status)}>
                    {getStatusText(simulado.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Questões:</span>
                    <span className="font-medium">{simulado.questoes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duração:</span>
                    <span className="font-medium">{simulado.duracao} min</span>
                  </div>
                  {simulado.nota && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Nota:</span>
                        <span className="font-medium">{simulado.nota}</span>
                      </div>
                      <Progress value={simulado.nota * 10} className="h-2" />
                    </div>
                  )}
                  <Button 
                    className="w-full"
                    variant={simulado.status === "concluido" ? "secondary" : "default"}
                  >
                    {simulado.status === "concluido" ? "Ver Resultado" : "Iniciar Simulado"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VestibularSimulados