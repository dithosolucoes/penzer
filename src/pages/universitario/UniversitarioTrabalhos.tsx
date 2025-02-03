import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, CheckCircle2 } from "lucide-react"
import AddTrabalhoDialog from "@/components/universitario/trabalhos/AddTrabalhoDialog"

export default function UniversitarioTrabalhos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meus Trabalhos</h1>
        <AddTrabalhoDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card de Trabalho Pendente */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#F2CED0]" />
              Trabalho de Cálculo III
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Entrega: 15/03/2024
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Status: Em andamento
              </div>
              <p className="text-sm mt-2">
                Resolução de exercícios sobre integrais triplas e mudança de variáveis.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card de Trabalho em Grupo */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#F2CED0]" />
              Projeto de Programação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Entrega: 22/03/2024
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Status: Não iniciado
              </div>
              <p className="text-sm mt-2">
                Desenvolvimento de uma aplicação web utilizando React e TypeScript.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}