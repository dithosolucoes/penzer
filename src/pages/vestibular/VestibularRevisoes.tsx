import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ListCheck, AlertTriangle } from "lucide-react"

const VestibularRevisoes = () => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">REVISÕES</h1>
        <Button variant="outline" className="gap-2">
          <ListCheck className="h-4 w-4" />
          Adicionar Revisão
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <Select defaultValue="todas">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por matéria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as matérias</SelectItem>
              <SelectItem value="matematica">Matemática</SelectItem>
              <SelectItem value="portugues">Português</SelectItem>
              <SelectItem value="fisica">Física</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="pendentes">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="pendentes">Pendentes</SelectItem>
              <SelectItem value="concluidas">Concluídas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matéria</TableHead>
              <TableHead>Conteúdo</TableHead>
              <TableHead>Data da Revisão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Nenhuma revisão encontrada</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

export default VestibularRevisoes