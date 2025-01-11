import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

        <Tabs defaultValue="todas" className="w-full">
          <TabsList>
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
          </TabsList>
          <TabsContent value="todas">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Example data, replace with actual data */}
                <TableRow>
                  <TableCell>Matemática</TableCell>
                  <TableCell>01/01/2023</TableCell>
                  <TableCell>
                    <Button variant="secondary" size="sm">Revisar</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>História</TableCell>
                  <TableCell>02/01/2023</TableCell>
                  <TableCell>
                    <Button variant="secondary" size="sm">Revisar</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="pendentes">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Example data, replace with actual data */}
                <TableRow>
                  <TableCell>Química</TableCell>
                  <TableCell>03/01/2023</TableCell>
                  <TableCell>
                    <Button variant="secondary" size="sm">Revisar</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="concluidas">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Example data, replace with actual data */}
                <TableRow>
                  <TableCell>Física</TableCell>
                  <TableCell>04/01/2023</TableCell>
                  <TableCell>
                    <Button variant="secondary" size="sm">Revisar</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Revisoes