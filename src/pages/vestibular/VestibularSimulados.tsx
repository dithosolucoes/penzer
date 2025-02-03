import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimuladoDetailsDialog } from "@/components/vestibular/simulados/SimuladoDetailsDialog"
import { DeleteSimuladoDialog } from "@/components/vestibular/simulados/DeleteSimuladoDialog"
import { AddSimuladoDialog } from "@/components/vestibular/simulados/AddSimuladoDialog"
import { Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const simuladosMock = [
  {
    id: 1,
    title: "Simulado ENEM 1",
    subject: "Geral",
    duration: "5h30",
    questions: 180,
    date: "15/05/2024",
    status: "pending"
  },
  {
    id: 2,
    title: "Simulado FUVEST",
    subject: "Geral",
    duration: "5h",
    questions: 150,
    date: "20/05/2024",
    status: "completed"
  }
]

export default function VestibularSimulados() {
  const [search, setSearch] = useState("")
  const [subject, setSubject] = useState("")
  const { toast } = useToast()

  const handleDeleteSimulado = (id: number) => {
    toast({
      title: "Simulado excluído",
      description: "O simulado foi excluído com sucesso.",
    })
  }

  return (
    <div className="container max-w-6xl py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SIMULADOS</h1>
        <AddSimuladoDialog />
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Total de Simulados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">7.8</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar simulado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="enem">ENEM</SelectItem>
            <SelectItem value="fuvest">FUVEST</SelectItem>
            <SelectItem value="unicamp">UNICAMP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Simulados */}
      <div className="space-y-4">
        {simuladosMock.map((simulado) => (
          <Card key={simulado.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{simulado.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{simulado.questions} questões</span>
                    <span>•</span>
                    <span>{simulado.duration}</span>
                    <span>•</span>
                    <span>{simulado.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SimuladoDetailsDialog simulado={simulado} />
                  <DeleteSimuladoDialog 
                    simuladoId={simulado.id}
                    onDelete={handleDeleteSimulado}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
