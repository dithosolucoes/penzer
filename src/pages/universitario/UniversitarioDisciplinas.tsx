import { Book } from "lucide-react"
import DisciplinaCard from "@/components/universitario/disciplinas/DisciplinaCard"
import AddDisciplinaDialog from "@/components/universitario/disciplinas/AddDisciplinaDialog"

// Dados mockados para exemplo
const disciplinas = [
  {
    nome: "Cálculo I",
    professor: "Dr. Ricardo Silva",
    horario: "Segunda e Quarta, 19h-20:30h",
    media: 8.5,
    faltas: 2,
    totalAulas: 32
  },
  {
    nome: "Física Geral",
    professor: "Dra. Maria Santos",
    horario: "Terça e Quinta, 20:45h-22:15h",
    media: 7.8,
    faltas: 4,
    totalAulas: 32
  },
  {
    nome: "Programação Estruturada",
    professor: "Dr. João Oliveira",
    horario: "Sexta, 19h-22:30h",
    media: 9.2,
    faltas: 1,
    totalAulas: 32
  },
  {
    nome: "Álgebra Linear",
    professor: "Dra. Ana Beatriz",
    horario: "Segunda e Quarta, 20:45h-22:15h",
    media: 6.5,
    faltas: 6,
    totalAulas: 32
  }
]

const UniversitarioDisciplinas = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Book className="h-6 w-6" />
          Minhas Disciplinas
        </h1>
        <AddDisciplinaDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {disciplinas.map((disciplina) => (
          <DisciplinaCard
            key={disciplina.nome}
            {...disciplina}
          />
        ))}
      </div>
    </div>
  )
}

export default UniversitarioDisciplinas