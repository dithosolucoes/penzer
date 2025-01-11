import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Lock, Plus, X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface Subject {
  id: number
  name: string
  weight: number
  hours: string
}

const CicloEstudos = () => {
  const [timePerBlock, setTimePerBlock] = useState("80")
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "MICROBIOLOGIA MÉDICA", weight: 1, hours: "01h:20" }
  ])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["MICROBIOLOGIA MÉDICA"])
  const [isEditing, setIsEditing] = useState(false)

  const handleAddSubject = (subject: Subject) => {
    setSubjects([...subjects, subject])
  }

  const handleRemoveSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id))
  }

  const handleSelectSubject = (name: string) => {
    if (selectedSubjects.includes(name)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== name))
    } else {
      setSelectedSubjects([...selectedSubjects, name])
    }
  }

  const handleSaveCycle = () => {
    toast.success("Ciclo Salvo!", {
      description: "Seu ciclo de estudos foi salvo com sucesso!"
    })
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <h1 className="text-2xl font-bold mb-8">CICLO DE ESTUDOS</h1>

        {/* Time Selection and Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-48">
            <p className="text-sm text-muted-foreground mb-2">TEMPO POR BLOCO</p>
            <Select value={timePerBlock} onValueChange={setTimePerBlock}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 min</SelectItem>
                <SelectItem value="45">45 min</SelectItem>
                <SelectItem value="60">60 min</SelectItem>
                <SelectItem value="80">80 min</SelectItem>
                <SelectItem value="90">90 min</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isEditing ? (
            <Button 
              variant="secondary"
              onClick={() => setIsEditing(false)}
              className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
            >
              ATUALIZAR/SALVAR CICLO
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="secondary"
                  className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
                >
                  DESBLOQUEAR EDIÇÃO
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Editar Ciclo</AlertDialogTitle>
                  <AlertDialogDescription>
                    Realmente deseja editar o seu ciclo de estudos?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>CANCELAR</AlertDialogCancel>
                  <AlertDialogAction onClick={() => setIsEditing(true)}>
                    CONFIRMAR
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Subjects List */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4" />
              <h2 className="font-semibold">DISCIPLINAS DO EDITAL</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>VEZES NO CICLO</span>
                <div className="flex gap-8">
                  <span>PESO</span>
                  <span>HORAS TOT.</span>
                </div>
              </div>
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{subject.id}</span>
                    <div className="bg-[#B4C6E4] px-4 py-2 rounded-md flex-1">
                      {subject.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Input 
                      type="number" 
                      value={subject.weight}
                      className="w-16 text-center"
                      readOnly={!isEditing}
                    />
                    <span className="w-16 text-center">{subject.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Selected Subjects */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4" />
              <h2 className="font-semibold">MEU CICLO</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-6 space-y-2">
              {selectedSubjects.map((subject) => (
                <div 
                  key={subject}
                  className="bg-[#B4C6E4] px-4 py-2 rounded-md flex justify-between items-center"
                >
                  {subject}
                  {isEditing && (
                    <button onClick={() => handleSelectSubject(subject)}>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {!isEditing && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-[#B4C6E4] text-black px-6 py-2 rounded-md flex items-center gap-2">
              Ciclo Salvo!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CicloEstudos