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
            <ReviewSettingsDialog />
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

        <Tabs defaultValue="para-fazer" className="w-full">
          <TabsList>
            <TabsTrigger value="para-fazer">PARA FAZER</TabsTrigger>
            <TabsTrigger value="concluidas">CONCLUÍDAS</TabsTrigger>
          </TabsList>
          <TabsContent value="para-fazer">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Empty state */}
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Nenhuma revisão para fazer no momento
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="concluidas">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Empty state */}
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Nenhuma revisão concluída
                        </p>
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