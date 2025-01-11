import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
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
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">REVISÕES</h1>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADICIONAR REVISÃO
          </Button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">FILTROS</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                DISCIPLINAS DO EDITAL
              </label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Buscar disciplina..." 
                  className="max-w-sm"
                />
                <Button variant="secondary" size="sm">
                  FILTRAR
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <Tabs defaultValue="para-fazer" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="para-fazer">PARA FAZER</TabsTrigger>
            <TabsTrigger value="concluidas">CONCLUÍDAS</TabsTrigger>
          </TabsList>

          <TabsContent value="para-fazer">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <h3 className="text-lg font-semibold p-4 border-b">
                PRÓXIMAS REVISÕES PROGRAMADAS
              </h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
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
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <h3 className="text-lg font-semibold p-4 border-b">
                REVISÕES CONCLUÍDAS
              </h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
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
                        <p>Nenhuma revisão concluída ainda.</p>
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