import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Calendar, ChartBar } from "lucide-react"

export default function VestibularDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Área do Vestibulando</h1>
        <div className="text-sm text-muted-foreground">
          Bem-vindo de volta!
        </div>
      </div>

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Simulados Realizados
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 simulados esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Matérias Estudadas
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 matérias hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próximo Vestibular
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 dias</div>
            <p className="text-xs text-muted-foreground">FUVEST 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Média Geral
            </CardTitle>
            <ChartBar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8</div>
            <p className="text-xs text-muted-foreground">+0.5 desde o último mês</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Simulado de Matemática</p>
                  <p className="text-sm text-muted-foreground">60 questões</p>
                </div>
                <span className="text-sm text-muted-foreground">Amanhã</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Revisão de Literatura</p>
                  <p className="text-sm text-muted-foreground">Modernismo</p>
                </div>
                <span className="text-sm text-muted-foreground">Em 2 dias</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Redação</p>
                  <p className="text-sm text-muted-foreground">Tema: Tecnologia</p>
                </div>
                <span className="text-sm text-muted-foreground">Em 3 dias</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Matéria</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Matemática</span>
                  <span className="text-sm">85%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-[#F2CED0] rounded-full" style={{ width: '85%' }} />
                </div>
              </li>
              <li className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Português</span>
                  <span className="text-sm">75%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-[#F2CED0] rounded-full" style={{ width: '75%' }} />
                </div>
              </li>
              <li className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">História</span>
                  <span className="text-sm">90%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-[#F2CED0] rounded-full" style={{ width: '90%' }} />
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}