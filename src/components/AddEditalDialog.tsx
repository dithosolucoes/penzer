import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload } from "lucide-react"
import { useState } from "react"

interface Subject {
  name: string;
  topics: string[];
}

export function AddEditalDialog() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedImage, setSelectedImage] = useState<string>("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addSubject = () => {
    setSubjects([...subjects, { name: "", topics: [] }])
  }

  const addTopic = (subjectIndex: number) => {
    const newSubjects = [...subjects]
    newSubjects[subjectIndex].topics.push("")
    setSubjects(newSubjects)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
        >
          <Plus className="w-4 h-4 mr-2" />
          ADICIONAR EDITAL
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            ADICIONAR NOVO EDITAL
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          {/* Upload do Logo */}
          <div className="flex flex-col items-center gap-4">
            <div 
              className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              onClick={() => document.getElementById("logo-upload")?.click()}
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Logo Preview" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-2">Upload do Logo</span>
                </>
              )}
            </div>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cargo</Label>
              <Input placeholder="Ex: Soldado Policial Militar" />
            </div>
            <div className="space-y-2">
              <Label>Órgão</Label>
              <Input placeholder="Ex: PM-SC" />
            </div>
            <div className="space-y-2">
              <Label>Ano</Label>
              <Input placeholder="Ex: 2024" />
            </div>
            <div className="space-y-2">
              <Label>Número de Vagas</Label>
              <Input type="number" placeholder="Ex: 500" />
            </div>
            <div className="space-y-2">
              <Label>Salário</Label>
              <Input placeholder="Ex: R$ 6.030,23" />
            </div>
            <div className="space-y-2">
              <Label>Data da Prova</Label>
              <Input type="date" />
            </div>
          </div>

          {/* Disciplinas e Tópicos */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Disciplinas e Tópicos</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={addSubject}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Disciplina
              </Button>
            </div>

            {subjects.map((subject, subjectIndex) => (
              <div 
                key={subjectIndex}
                className="bg-gray-50 p-4 rounded-lg space-y-4"
              >
                <Input 
                  placeholder="Nome da Disciplina"
                  value={subject.name}
                  onChange={(e) => {
                    const newSubjects = [...subjects]
                    newSubjects[subjectIndex].name = e.target.value
                    setSubjects(newSubjects)
                  }}
                />
                
                <div className="space-y-2">
                  {subject.topics.map((topic, topicIndex) => (
                    <Input
                      key={topicIndex}
                      placeholder="Nome do Tópico"
                      value={topic}
                      onChange={(e) => {
                        const newSubjects = [...subjects]
                        newSubjects[subjectIndex].topics[topicIndex] = e.target.value
                        setSubjects(newSubjects)
                      }}
                    />
                  ))}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addTopic(subjectIndex)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Tópico
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">
              CANCELAR
            </Button>
            <Button>
              SALVAR EDITAL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}