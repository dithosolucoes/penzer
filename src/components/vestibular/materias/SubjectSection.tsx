import { GraduationCap } from "lucide-react"
import SubjectCard from "./SubjectCard"

interface Subject {
  nome: string
  progresso: number
  questoesResolvidas: number
  horasEstudadas: number
}

interface SubjectSectionProps {
  title: string
  subjects: Subject[]
}

const SubjectSection = ({ title, subjects }: SubjectSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <GraduationCap className="w-6 h-6" />
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.nome} {...subject} />
        ))}
      </div>
    </div>
  )
}

export default SubjectSection