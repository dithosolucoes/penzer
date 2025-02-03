import { StudyCalendar } from "@/components/home/StudyCalendar"
import { useState } from "react"
import { GoogleCalendarDialog } from "@/components/GoogleCalendarDialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus } from "lucide-react"

const UniversitarioCronograma = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  
  // Mock data for study sessions
  const studySessionsByDate: Record<string, any[]> = {
    "2024-03-20": [
      { subject: "Cálculo III", chapter: "Integrais Triplas", time: "08:00 - 10:00" },
      { subject: "Física II", chapter: "Eletromagnetismo", time: "14:00 - 16:00" }
    ],
    "2024-03-22": [
      { subject: "Programação", chapter: "React Hooks", time: "09:00 - 12:00" }
    ]
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">CRONOGRAMA</h1>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setCalendarDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Adicionar Evento
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="p-6">
          <CardHeader className="px-0">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendário de Estudos
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <StudyCalendar
              date={date}
              setDate={setDate}
              studySessionsByDate={studySessionsByDate}
              setCalendarDialogOpen={setCalendarDialogOpen}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5" />
                Eventos do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {studySessionsByDate[date.toISOString().split('T')[0]]?.map((session, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-medium">{session.subject}</h3>
                  <p className="text-sm text-muted-foreground">{session.chapter}</p>
                  <p className="text-sm text-muted-foreground">{session.time}</p>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">
                  Nenhum evento programado para este dia.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximas Revisões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Cálculo III</h3>
                  <p className="text-sm text-muted-foreground">Revisão em 2 dias</p>
                </div>
                <div>
                  <h3 className="font-medium">Física II</h3>
                  <p className="text-sm text-muted-foreground">Revisão em 5 dias</p>
                </div>
              </div>
            </CardContent>
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

export default UniversitarioCronograma