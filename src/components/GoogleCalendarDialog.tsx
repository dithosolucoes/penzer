import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface GoogleCalendarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const GoogleCalendarDialog = ({
  open,
  onOpenChange,
}: GoogleCalendarDialogProps) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      // Aqui iremos implementar a conexão com o Google Calendar
      toast({
        title: "Em desenvolvimento",
        description: "A integração com o Google Calendar será implementada em breve.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao conectar",
        description: "Não foi possível conectar com o Google Calendar.",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle>Conectar com Google Agenda</DialogTitle>
          <DialogDescription>
            Sincronize seus estudos com o Google Agenda para melhor organização
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg dark:bg-gray-800">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Benefícios da sincronização</h4>
              <ul className="text-sm text-muted-foreground list-disc ml-4 mt-2">
                <li>Visualize seus estudos em qualquer dispositivo</li>
                <li>Receba lembretes de revisões</li>
                <li>Compartilhe seu calendário de estudos</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {isConnecting ? "Conectando..." : "Conectar com Google Agenda"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Você poderá desconectar a qualquer momento
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}