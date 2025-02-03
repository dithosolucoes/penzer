import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StickyNote, Plus } from "lucide-react"

const UniversitarioNotas = () => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">NOTAS</h1>
        <Button className="bg-[#F2CED0] hover:bg-[#F2CED0]/90 text-black">
          <Plus className="h-4 w-4 mr-2" />
          Nova Nota
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Example Note Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cálculo I</CardTitle>
            <StickyNote className="h-4 w-4 text-[#F2CED0]" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Última atualização: 10/03/2024</p>
            <p className="mt-2 text-sm">Fórmulas importantes para a prova de derivadas...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Física II</CardTitle>
            <StickyNote className="h-4 w-4 text-[#F2CED0]" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Última atualização: 09/03/2024</p>
            <p className="mt-2 text-sm">Anotações sobre movimento harmônico simples...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UniversitarioNotas