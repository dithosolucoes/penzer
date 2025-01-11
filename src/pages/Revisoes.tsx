import { Button } from "@/components/ui/button"
import { Settings2, AlertTriangle, ArrowUpDown } from "lucide-react"
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">REVISÕES</h1>
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              size="sm"
              type="button"
              className="font-medium flex items-center gap-2"
              onClick={() => {
                const dialog = document.querySelector("[data-trigger='review-settings']")
                if (dialog instanceof HTMLElement) {
                  dialog.click()
                }
              }}
            >
              <Settings2 className="h-4 w-4" />
              CONFIGURAÇÕES
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              type="button"
              className="font-medium"
              onClick={() => {
                const dialog = document.querySelector("[data-trigger='add-study']")
                if (dialog instanceof HTMLElement) {
                  dialog.click()
                }
              }}
            >
              ADICIONAR ESTUDO
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4">FILTROS</h2>
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <h3 className="text-sm font-medium mb-2">DISCIPLINAS DO EDITAL</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full text-xs px-3 py-1 h-auto"
                  >
                    MAT
                  </Button>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs font-medium"
              >
                FILTRAR
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="para-fazer" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent space-x-8">
            <TabsTrigger 
              value="para-fazer"
              className="pb-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              PARA FAZER
            </TabsTrigger>
            <TabsTrigger 
              value="concluidas"
              className="pb-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              CONCLUÍDAS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="para-fazer">
            <div className="rounded-lg border bg-white mt-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-6">PRÓXIMAS REVISÕES PROGRAMADAS</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-medium">
                        <div className="flex items-center gap-2">
                          AGENDADO P/
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="font-medium">ESTUDADO EM</TableHead>
                      <TableHead className="font-medium">EDITAL</TableHead>
                      <TableHead className="font-medium">DISCIPLINA / CAPÍTULO</TableHead>
                      <TableHead className="font-medium">ASSUNTOS</TableHead>
                      <TableHead className="font-medium">STATUS</TableHead>
                      <TableHead className="font-medium">HISTÓRICO DE REVISÕES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div className="flex items-center gap-3 justify-center py-8 text-muted-foreground">
                          <AlertTriangle className="h-5 w-5" />
                          <p>Ainda sem revisões programadas, faça um estudo e agende suas revisões!</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="concluidas">
            <div className="rounded-lg border bg-white mt-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-6">REVISÕES CONCLUÍDAS</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-medium">
                        <div className="flex items-center gap-2">
                          AGENDADO P/
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="font-medium">ESTUDADO EM</TableHead>
                      <TableHead className="font-medium">EDITAL</TableHead>
                      <TableHead className="font-medium">DISCIPLINA / CAPÍTULO</TableHead>
                      <TableHead className="font-medium">ASSUNTOS</TableHead>
                      <TableHead className="font-medium">STATUS</TableHead>
                      <TableHead className="font-medium">HISTÓRICO DE REVISÕES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div className="flex items-center gap-3 justify-center py-8 text-muted-foreground">
                          <AlertTriangle className="h-5 w-5" />
                          <p>Nenhuma revisão concluída</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Revisoes