import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, BookOpen } from "lucide-react"

interface SimuladoDetailsDialogProps {
  simulado: {
    id: number
    title: string
    subject: string
    duration: string
    questions: number
    date: string
  }
}

export function SimuladoDetailsDialog({ simulado }: SimuladoDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="secondary"
          size="sm" 
          className="w-full bg-[#F2CED0] hover:bg-[#F2CED0]/80 text-gray-800"
        >
          VER DETALHES
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {simulado.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Duração: {simulado.duration}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span>{simulado.questions} questões</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Data: {simulado.date}</span>
            </div>
          </div>

          <div className="bg-secondary/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Instruções:</h4>
            <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
              <li>Leia atentamente todas as questões</li>
              <li>Você pode marcar questões para revisar depois</li>
              <li>O tempo começará a contar após clicar em iniciar</li>
              <li>Suas respostas são salvas automaticamente</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-[#F2CED0] hover:bg-[#F2CED0]/80 text-gray-800">
              Iniciar Simulado
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}