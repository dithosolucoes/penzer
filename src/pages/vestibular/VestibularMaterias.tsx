import AddSubjectDialog from "@/components/vestibular/materias/AddSubjectDialog"
import SubjectSection from "@/components/vestibular/materias/SubjectSection"

const materias = {
  exatas: [
    { nome: "Matemática", progresso: 75, questoesResolvidas: 150, horasEstudadas: 24 },
    { nome: "Física", progresso: 60, questoesResolvidas: 120, horasEstudadas: 18 },
    { nome: "Química", progresso: 45, questoesResolvidas: 90, horasEstudadas: 15 }
  ],
  humanas: [
    { nome: "História", progresso: 80, questoesResolvidas: 130, horasEstudadas: 20 },
    { nome: "Geografia", progresso: 70, questoesResolvidas: 110, horasEstudadas: 16 },
    { nome: "Literatura", progresso: 65, questoesResolvidas: 100, horasEstudadas: 14 }
  ],
  biologicas: [
    { nome: "Biologia", progresso: 55, questoesResolvidas: 95, horasEstudadas: 17 },
    { nome: "Anatomia", progresso: 40, questoesResolvidas: 75, horasEstudadas: 12 }
  ]
}

const VestibularMaterias = () => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">MATÉRIAS</h1>
        <AddSubjectDialog />
      </div>

      <SubjectSection title="Exatas" subjects={materias.exatas} />
      <SubjectSection title="Humanas" subjects={materias.humanas} />
      <SubjectSection title="Biológicas" subjects={materias.biologicas} />
    </div>
  )
}

export default VestibularMaterias