import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"

interface GoogleCalendarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const GoogleCalendarDialog = ({
  open,
  onOpenChange,
}: GoogleCalendarDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Conectar com Google Agenda</DialogTitle>
          <DialogDescription>
            Sincronize seus estudos com o Google Agenda para melhor organização
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Benefícios da sincronização</h4>
              <ul className="text-sm text-gray-500 list-disc ml-4 mt-2">
                <li>Visualize seus estudos em qualquer dispositivo</li>
                <li>Receba lembretes de revisões</li>
                <li>Compartilhe seu calendário de estudos</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Conectar com Google Agenda
            </Button>
            <p className="text-xs text-center text-gray-500">
              Você poderá desconectar a qualquer momento
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}