import { StudyCalendar } from "@/components/home/StudyCalendar"
import { useState } from "react"
import { GoogleCalendarDialog } from "@/components/GoogleCalendarDialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus } from "lucide-react"
import { AddEventDialog } from "@/components/universitario/cronograma/AddEventDialog"

const UniversitarioCronograma = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [addEventDialogOpen, setAddEventDialogOpen] = useState(false)
  
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
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setCalendarDialogOpen(true)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Google Agenda
          </Button>
          <Button 
            className="bg-[#F2CED0] hover:bg-[#e4b5b7] text-gray-800"
            onClick={() => setAddEventDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Evento
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Eventos do Dia
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[200px]">
              {studySessionsByDate[date.toISOString().split('T')[0]]?.map((session, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <h3 className="font-medium text-lg">{session.subject}</h3>
                  <p className="text-muted-foreground">{session.chapter}</p>
                  <p className="text-sm text-muted-foreground mt-2">{session.time}</p>
                </div>
              )) || (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Nenhum evento programado para este dia.
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => setAddEventDialogOpen(true)}
                    className="mt-2"
                  >
                    Adicionar evento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Revisões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <h3 className="font-medium">Cálculo III</h3>
                  <p className="text-sm text-muted-foreground">Revisão em 2 dias</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
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

      <AddEventDialog
        open={addEventDialogOpen}
        onOpenChange={setAddEventDialogOpen}
      />
    </div>
  )
}

export default UniversitarioCronograma