import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { AlertTriangle } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Revisoes = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8f9fa]">
      <div className="container py-8">
        {/* Seção de Filtros */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">FILTROS</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="font-medium mb-2 block">
                  DISCIPLINAS DO EDITAL
                </label>
                <div className="flex gap-4">
                  <Input 
                    type="text" 
                    placeholder="Buscar disciplinas..."
                    className="max-w-md"
                  />
                  <Button variant="secondary">
                    FILTRAR
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full"
                >
                  MM1
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs e Tabela de Revisões */}
        <Tabs defaultValue="para-fazer" className="space-y-4">
          <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent">
            <TabsTrigger 
              value="para-fazer"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              PARA FAZER
            </TabsTrigger>
            <TabsTrigger 
              value="concluidas"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              CONCLUÍDAS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="para-fazer">
            <div className="bg-white rounded-lg shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f8f9fa]">
                    <TableHead>AGENDADO P/</TableHead>
                    <TableHead>ESTUDADO EM</TableHead>
                    <TableHead>EDITAL</TableHead>
                    <TableHead>DISCIPLINA/CAPÍTULO</TableHead>
                    <TableHead>ASSUNTOS</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>HISTÓRICO DE REVISÕES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <AlertTriangle className="w-6 h-6" />
                        <p>Ainda sem revisões programadas, faça um estudo e agende suas revisões!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="concluidas">
            <div className="bg-white rounded-lg shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f8f9fa]">
                    <TableHead>AGENDADO P/</TableHead>
                    <TableHead>ESTUDADO EM</TableHead>
                    <TableHead>EDITAL</TableHead>
                    <TableHead>DISCIPLINA/CAPÍTULO</TableHead>
                    <TableHead>ASSUNTOS</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>HISTÓRICO DE REVISÕES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <AlertTriangle className="w-6 h-6" />
                        <p>Ainda sem revisões concluídas!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Revisoes