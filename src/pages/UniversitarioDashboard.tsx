import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UniversitarioDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Área do Universitário</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Disciplinas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie suas disciplinas do semestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trabalhos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Organize seus trabalhos e projetos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendário Acadêmico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe datas importantes do semestre</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}