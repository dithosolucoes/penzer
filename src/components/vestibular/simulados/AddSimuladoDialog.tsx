import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function AddSimuladoDialog() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState("")
  const [duration, setDuration] = useState("")
  const [date, setDate] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically make an API call to save the simulado
    toast({
      title: "Simulado criado",
      description: "O novo simulado foi criado com sucesso.",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#F2CED0] hover:bg-[#F2CED0]/80 text-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          NOVO SIMULADO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            CRIAR NOVO SIMULADO
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Simulado ENEM 2024"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="questions" className="text-sm font-medium">
              Número de Questões
            </label>
            <Input
              id="questions"
              type="number"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="Ex: 180"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm font-medium">
              Duração
            </label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Ex: 5h30"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Data
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-[#F2CED0] hover:bg-[#F2CED0]/80 text-gray-800"
            >
              Criar Simulado
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}