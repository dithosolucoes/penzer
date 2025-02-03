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
import { PomodoroTimer } from "@/components/PomodoroTimer"

interface Disciplina {
  id: number
  nome: string
  peso: number
  horas: string
}

export const CicloEstudos = () => {
  const [tempoPorBloco, setTempoPorBloco] = useState("80")
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([
    { id: 1, nome: "Cálculo I", peso: 1, horas: "01h:20" },
    { id: 2, nome: "Física I", peso: 1, horas: "01h:20" },
    { id: 3, nome: "Programação", peso: 1, horas: "01h:20" }
  ])
  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState<string[]>(["Cálculo I"])
  const [editando, setEditando] = useState(false)

  const handleSalvarCiclo = () => {
    setEditando(false)
    toast.success("Ciclo Salvo!", {
      description: "Seu ciclo de estudos foi salvo com sucesso!"
    })
  }

  const handleLimparCiclo = () => {
    setDisciplinasSelecionadas([])
  }

  const handleRemoverDisciplina = (nomeDisciplina: string) => {
    setDisciplinasSelecionadas(prev => prev.filter(d => d !== nomeDisciplina))
  }

  return (
    <div className="space-y-8">
      {/* Timer Pomodoro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PomodoroTimer />
        
        {/* Configurações do Ciclo */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Configurações do Ciclo</h2>
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">TEMPO POR BLOCO</p>
              <Select value={tempoPorBloco} onValueChange={setTempoPorBloco}>
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

            {editando ? (
              <Button 
                variant="secondary"
                onClick={handleSalvarCiclo}
                className="w-full bg-[#F2CED0] hover:bg-[#F2CED0]/80"
              >
                ATUALIZAR/SALVAR CICLO
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="secondary"
                    className="w-full bg-[#F2CED0] hover:bg-[#F2CED0]/80"
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
                    <AlertDialogAction onClick={() => setEditando(true)}>
                      CONFIRMAR
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>

      {/* Lista de Disciplinas e Ciclo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Disciplinas */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4" />
            <h2 className="font-semibold">DISCIPLINAS DO SEMESTRE</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>VEZES NO CICLO</span>
              <div className="flex gap-8">
                <span>PESO</span>
                <span>HORAS TOT.</span>
              </div>
            </div>
            {disciplinas.map((disciplina) => (
              <div key={disciplina.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{disciplina.id}</span>
                  <div className="bg-[#F2CED0] px-4 py-2 rounded-md flex-1">
                    {disciplina.nome}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Input 
                    type="number" 
                    value={disciplina.peso}
                    className="w-16 text-center"
                    readOnly={!editando}
                  />
                  <span className="w-16 text-center">{disciplina.horas}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meu Ciclo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4" />
            <h2 className="font-semibold">MEU CICLO</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-6 space-y-2">
            {disciplinasSelecionadas.map((disciplina) => (
              <div 
                key={disciplina}
                className="bg-[#F2CED0] px-4 py-2 rounded-md flex justify-between items-center"
              >
                {disciplina}
                {editando && (
                  <button onClick={() => handleRemoverDisciplina(disciplina)}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {editando && disciplinasSelecionadas.length > 0 && (
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleLimparCiclo}
              >
                <X className="w-4 h-4" />
                LIMPAR CICLO
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}