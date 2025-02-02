import { Button } from "@/components/ui/button"
import { Award, Target, Clock, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const Simulados = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">SIMULADOS</h1>
          <Button variant="secondary" className="gap-2">
            <Plus className="h-4 w-4" />
            NOVO SIMULADO
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                MÉDIA GERAL
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">680</div>
              <Progress value={68} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                SIMULADOS REALIZADOS
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                TEMPO MÉDIO POR QUESTÃO
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3m 24s</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">HISTÓRICO DE SIMULADOS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((simulado) => (
              <div key={simulado} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-[#E8E8E8] px-6 py-4">
                  <h3 className="font-semibold text-black">Simulado FUVEST #{simulado}</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Data:</span>
                    <span className="text-sm font-medium">12/03/2024</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Nota:</span>
                    <span className="text-sm font-medium">720</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Tempo Total:</span>
                    <span className="text-sm font-medium">4h 12min</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} />
                  </div>

                  <Button 
                    variant="secondary"
                    className="w-full mt-4 bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
                  >
                    VER DETALHES
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulados