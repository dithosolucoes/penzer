import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Plus, Save, Trash2 } from "lucide-react"
import { useState } from "react"

interface EditEditalSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editalTitle: string
}

export function EditEditalSheet({ open, onOpenChange, editalTitle }: EditEditalSheetProps) {
  const [disciplines, setDisciplines] = useState([
    { 
      id: 1,
      code: "D1",
      name: "DIREITO CONSTITUCIONAL",
      weight: 1,
      topics: [
        { id: 1, name: "Constituição: conceito, objeto e elementos" },
        { id: 2, name: "Supremacia da Constituição" }
      ]
    }
  ])

  const addDiscipline = () => {
    const newId = disciplines.length + 1
    setDisciplines([...disciplines, {
      id: newId,
      code: `D${newId}`,
      name: "",
      weight: 1,
      topics: []
    }])
  }

  const addTopic = (disciplineId: number) => {
    setDisciplines(disciplines.map(disc => {
      if (disc.id === disciplineId) {
        const newTopicId = disc.topics.length + 1
        return {
          ...disc,
          topics: [...disc.topics, { id: newTopicId, name: "" }]
        }
      }
      return disc
    }))
  }

  const removeDiscipline = (id: number) => {
    setDisciplines(disciplines.filter(d => d.id !== id))
  }

  const removeTopic = (disciplineId: number, topicId: number) => {
    setDisciplines(disciplines.map(disc => {
      if (disc.id === disciplineId) {
        return {
          ...disc,
          topics: disc.topics.filter(t => t.id !== topicId)
        }
      }
      return disc
    }))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[800px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left">{editalTitle}</SheetTitle>
          <SheetDescription className="text-left">
            Edite as disciplinas e tópicos do seu edital
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {disciplines.map((discipline) => (
            <div key={discipline.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center gap-4">
                <Input 
                  placeholder="Código" 
                  value={discipline.code}
                  className="w-24"
                />
                <Input 
                  placeholder="Nome da Disciplina" 
                  value={discipline.name}
                  className="flex-1"
                />
                <Input 
                  type="number" 
                  placeholder="Peso" 
                  value={discipline.weight}
                  className="w-24"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDiscipline(discipline.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 pl-4">
                {discipline.topics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-4">
                    <Input 
                      placeholder="Nome do Tópico" 
                      value={topic.name}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTopic(discipline.id, topic.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addTopic(discipline.id)}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Tópico
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={addDiscipline}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Disciplina
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}