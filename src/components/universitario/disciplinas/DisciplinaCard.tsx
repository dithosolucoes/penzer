import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Book, Clock, GraduationCap } from "lucide-react"

interface DisciplinaCardProps {
  nome: string
  professor: string
  horario: string
  media: number
  faltas: number
  totalAulas: number
}

const DisciplinaCard = ({ nome, professor, horario, media, faltas, totalAulas }: DisciplinaCardProps) => {
  const presenca = Math.round(((totalAulas - faltas) / totalAulas) * 100)
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">{nome}</span>
          <span className={`text-lg font-bold ${media >= 7 ? 'text-green-500' : media >= 5 ? 'text-yellow-500' : 'text-red-500'}`}>
            {media.toFixed(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4" />
          <span>{professor}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{horario}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Presença</span>
            <span>{presenca}%</span>
          </div>
          <Progress value={presenca} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

export default DisciplinaCard