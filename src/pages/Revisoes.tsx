import { Button } from "@/components/ui/button"
import { Settings2, AlertTriangle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { ReviewSettingsDialog } from "@/components/ReviewSettingsDialog"
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
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">REVISÕES</h1>
          <div className="flex items-center gap-3">
            <ReviewSettingsDialog>
              <Button 
                variant="secondary" 
                size="sm"
                className="font-medium flex items-center gap-2"
              >
                <Settings2 className="h-4 w-4" />
                CONFIGURAÇÕES
              </Button>
            </ReviewSettingsDialog>
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
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">DISCIPLINAS DO EDITAL</h2>
          {/* Filter section will be implemented later */}
        </div>

        <Tabs defaultValue="para-fazer" className="w-full">
          <TabsList>
            <TabsTrigger value="para-fazer">PARA FAZER</TabsTrigger>
            <TabsTrigger value="concluidas">CONCLUÍDAS</TabsTrigger>
          </TabsList>
          <TabsContent value="para-fazer">
            <div className="rounded-lg border">
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
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Ainda sem revisões programadas, faça um estudo e agende suas revisões!</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="concluidas">
            <div className="rounded-lg border">
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
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Ainda sem revisões concluídas!</span>
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