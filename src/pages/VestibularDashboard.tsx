import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VestibularDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Área do Vestibulando</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Simulados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse simulados específicos para o vestibular</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Matérias</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Organize suas matérias do vestibular</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cronograma</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Planeje seus estudos para o vestibular</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}