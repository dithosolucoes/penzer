import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Historico = () => {
  const years = ["2021", "2022", "2023"]
  const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
  const categories = ["ESTUDO", "EXERCÍCIOS", "REVISÃO"]

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="container py-8 space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">HISTÓRICO DE ESTUDOS</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            ADICIONAR ESTUDO
          </Button>
        </div>

        {/* Filters Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">FILTROS</h2>
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">DISCIPLINAS DO EDITAL</h3>
                  <Filter className="h-4 w-4" />
                </div>
                <Badge variant="secondary" className="cursor-pointer">
                  CMB
                </Badge>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">ANOS</h3>
                  <Filter className="h-4 w-4" />
                </div>
                <div className="flex gap-2">
                  {years.map((year) => (
                    <Badge key={year} variant="secondary" className="cursor-pointer">
                      {year}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">MESES</h3>
                  <Filter className="h-4 w-4" />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {months.map((month) => (
                    <Badge key={month} variant="secondary" className="cursor-pointer">
                      {month}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">CATEGORIAS</h3>
                  <Filter className="h-4 w-4" />
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Badge key={category} variant="secondary" className="cursor-pointer">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>FILTRAR</Button>
            </div>
          </Card>
        </div>

        {/* General Data Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">DADOS GERAIS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <h3 className="text-center font-medium mb-4">TEMPO DE ESTUDO</h3>
              <p className="text-center text-2xl font-bold">0h</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-center font-medium mb-4">TOTAL DE PÁGINAS LIDAS</h3>
              <p className="text-center text-2xl font-bold">0</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-center font-medium mb-4">DESEMPENHO</h3>
              <div className="h-6 bg-secondary rounded-full"></div>
            </Card>
          </div>
        </div>

        {/* Study History Table */}
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DATA</TableHead>
                <TableHead>CATEG.</TableHead>
                <TableHead>EDITAL</TableHead>
                <TableHead>DISCIPLINA/TÓPICO</TableHead>
                <TableHead>ASSUNTOS</TableHead>
                <TableHead>TEMPO</TableHead>
                <TableHead>EXERC. (ACERTOS X ERROS)</TableHead>
                <TableHead>PÁG. LIDAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <p>Ainda sem estudos registrados.</p>
                    <p>
                      Inicie um Estudo ou{" "}
                      <Button variant="link" className="p-0 h-auto font-normal">
                        Adicione um Estudo!
                      </Button>
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Historico