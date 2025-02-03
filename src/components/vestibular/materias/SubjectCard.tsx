import { BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SubjectCardProps {
  nome: string
  progresso: number
  questoesResolvidas: number
  horasEstudadas: number
}

const SubjectCard = ({ nome, progresso, questoesResolvidas, horasEstudadas }: SubjectCardProps) => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#F2CED0]" />
          <h3 className="font-semibold">{nome}</h3>
        </div>
        <span className="text-sm font-medium text-green-600">{progresso}%</span>
      </div>
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#F2CED0] h-2 rounded-full" 
            style={{ width: `${progresso}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{questoesResolvidas} questões</span>
          <span>{horasEstudadas}h estudadas</span>
        </div>
      </div>
    </Card>
  )
}

export default SubjectCard