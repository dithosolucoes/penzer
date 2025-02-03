import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Book, 
  FileText, 
  Calendar, 
  BarChart2, 
  Clock,
  GraduationCap,
  Bell,
  CheckCircle2
} from "lucide-react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const performanceData = [
  { name: "Jan", value: 7.5 },
  { name: "Fev", value: 8.0 },
  { name: "Mar", value: 7.8 },
  { name: "Abr", value: 8.5 },
  { name: "Mai", value: 8.2 },
  { name: "Jun", value: 8.5 }
]

const UniversitarioHome = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MEU DIA</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está o resumo das suas atividades.
          </p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-accent/30 px-4 py-2 rounded-lg"
        >
          <Bell className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm font-medium">3 novas notificações</span>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Disciplinas Ativas
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                75% do semestre concluído
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trabalhos Pendentes
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-xs">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                  <span>1 atrasado</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
                  <span>2 próximos da entrega</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Próximas Provas
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-xs">
                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>Próxima em 3 dias</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Média Geral
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5</div>
              <div className="h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F2CED0" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F2CED0" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#F2CED0"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Próximas Atividades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-accent/10 rounded-lg">
                  <div className="flex-shrink-0">
                    <FileText className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none">Entrega do Trabalho de Cálculo</p>
                    <p className="text-sm text-muted-foreground">Segunda-feira, 15:00</p>
                  </div>
                  <div className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Urgente
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-accent/10 rounded-lg">
                  <div className="flex-shrink-0">
                    <Book className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none">Prova de Física</p>
                    <p className="text-sm text-muted-foreground">Quarta-feira, 10:00</p>
                  </div>
                  <div className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Prova
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                Disciplinas do Semestre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium leading-none">Cálculo I</p>
                      <span className="text-sm font-medium">8.0</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Prof. Silva • 80% concluído</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium leading-none">Física I</p>
                      <span className="text-sm font-medium">7.5</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Prof. Santos • 65% concluído</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default UniversitarioHome