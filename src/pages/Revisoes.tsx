import { Button } from "@/components/ui/button"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { Card, CardContent } from "@/components/ui/card"
import { ReviewSettingsDialog } from "@/components/ReviewSettingsDialog"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const Revisoes = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">AGENDA DE REVISÕES</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSettingsOpen(true)}
          >
            CONFIGURAÇÕES
          </Button>
          <AddStudyDialog>
            <Button variant="secondary" size="sm">
              ADICIONAR ESTUDO
            </Button>
          </AddStudyDialog>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">FILTROS</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">DISCIPLINAS DO EDITAL</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="cursor-pointer">MAT</Badge>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="secondary" size="sm">FILTRAR</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="todo">PARA FAZER</TabsTrigger>
          <TabsTrigger value="done">CONCLUÍDAS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todo">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-500">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2">AGENDADO P/</th>
                      <th className="pb-2">ESTUDADO EM</th>
                      <th className="pb-2">EDITAL</th>
                      <th className="pb-2">DISCIPLINA/CAPÍTULO</th>
                      <th className="pb-2">ASSUNTOS</th>
                      <th className="pb-2">STATUS</th>
                      <th className="pb-2">HISTÓRICO DE REVISÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        Ainda sem revisões programadas, faça um estudo e agende suas revisões!
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="done">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-500 text-center py-4">
                Nenhuma revisão concluída
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ReviewSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  )
}

export default Revisoes