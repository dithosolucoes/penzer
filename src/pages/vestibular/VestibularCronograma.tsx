import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { GoogleCalendarDialog } from "@/components/GoogleCalendarDialog"

const VestibularCronograma = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">CRONOGRAMA</h1>
        <Button
          variant="outline"
          onClick={() => setCalendarDialogOpen(true)}
          className="gap-2"
        >
          <CalendarIcon className="h-4 w-4" />
          Conectar Google Agenda
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Calendário de Estudos</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              locale={ptBR}
              className="rounded-md border"
            />
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              Estudos do Dia {format(date, "dd/MM/yyyy")}
            </h2>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Nenhum estudo programado para este dia.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Próximas Revisões</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Nenhuma revisão agendada.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <GoogleCalendarDialog 
        open={calendarDialogOpen}
        onOpenChange={setCalendarDialogOpen}
      />
    </div>
  )
}

export default VestibularCronograma