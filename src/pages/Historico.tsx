import { Button } from "@/components/ui/button"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Historico = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">HISTÓRICO</h1>
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

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por disciplina, assunto..."
            className="pl-10"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DATA</TableHead>
                <TableHead>EDITAL</TableHead>
                <TableHead>DISCIPLINA/CAPÍTULO</TableHead>
                <TableHead>ASSUNTOS</TableHead>
                <TableHead>PÁGINAS LIDAS</TableHead>
                <TableHead>TEMPO DE ESTUDO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>10/03/2024</TableCell>
                <TableCell>ENEM 2024</TableCell>
                <TableCell>Biologia/Cap. 1</TableCell>
                <TableCell>Citologia, Membrana Plasmática</TableCell>
                <TableCell>15</TableCell>
                <TableCell>2h 30min</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>09/03/2024</TableCell>
                <TableCell>ENEM 2024</TableCell>
                <TableCell>Química/Cap. 2</TableCell>
                <TableCell>Ligações Químicas</TableCell>
                <TableCell>20</TableCell>
                <TableCell>3h</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>08/03/2024</TableCell>
                <TableCell>ENEM 2024</TableCell>
                <TableCell>Física/Cap. 3</TableCell>
                <TableCell>Mecânica, Cinemática</TableCell>
                <TableCell>18</TableCell>
                <TableCell>2h 45min</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Historico