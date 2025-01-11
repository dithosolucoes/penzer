import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Plus, Save, Trash2, GripVertical, MoreHorizontal } from "lucide-react"
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
      code: "MAT",
      name: "CLINICA MÉDICA",
      weight: 1,
      topics: [
        { 
          id: 1, 
          name: "Sepse",
          subtopics: [
            { id: 1, name: "Sepse" }
          ]
        },
        { 
          id: 2, 
          name: "HIV (Vírus da Imunodeficiência Humana)",
          subtopics: [
            { id: 1, name: "HIV (Vírus da Imunodeficiência Humana)" }
          ]
        }
      ]
    }
  ])

  const addDiscipline = () => {
    const newId = disciplines.length + 1
    setDisciplines([...disciplines, {
      id: newId,
      code: "",
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
          topics: [...disc.topics, { id: newTopicId, name: "", subtopics: [] }]
        }
      }
      return disc
    }))
  }

  const addSubtopic = (disciplineId: number, topicId: number) => {
    setDisciplines(disciplines.map(disc => {
      if (disc.id === disciplineId) {
        return {
          ...disc,
          topics: disc.topics.map(topic => {
            if (topic.id === topicId) {
              const newSubtopicId = topic.subtopics.length + 1
              return {
                ...topic,
                subtopics: [...topic.subtopics, { id: newSubtopicId, name: "" }]
              }
            }
            return topic
          })
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
            <div key={discipline.id} className="space-y-4">
              <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-500">SIGLA</div>
                  <Input 
                    placeholder="Sigla" 
                    value={discipline.code}
                    className="w-24 bg-white"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="text-xs font-medium text-gray-500">NOME DA DISCIPLINA</div>
                  <Input 
                    placeholder="Nome da Disciplina" 
                    value={discipline.name}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-500">PESO</div>
                  <Input 
                    type="number" 
                    placeholder="Peso" 
                    value={discipline.weight}
                    className="w-24 bg-white"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <GripVertical className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 pl-8">
                {discipline.topics.map((topic) => (
                  <div key={topic.id} className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        TÓPICO
                      </div>
                      <Input 
                        placeholder="Nome do Tópico" 
                        value={topic.name}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => addSubtopic(discipline.id, topic.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <GripVertical className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>

                    {topic.subtopics.map((subtopic) => (
                      <div key={subtopic.id} className="flex items-center gap-4 pl-8">
                        <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          SUBTÓPICO
                        </div>
                        <Input 
                          placeholder="Nome do Subtópico" 
                          value={subtopic.name}
                          className="flex-1"
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <GripVertical className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
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