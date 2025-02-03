import { StudyCalendar } from "@/components/home/StudyCalendar"
import { useState } from "react"
import { GoogleCalendarDialog } from "@/components/GoogleCalendarDialog"

const UniversitarioCronograma = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  
  // Mock data for study sessions
  const studySessionsByDate: Record<string, any[]> = {
    "2024-03-20": [
      { subject: "Cálculo III", chapter: "Integrais Triplas" },
      { subject: "Física II", chapter: "Eletromagnetismo" }
    ],
    "2024-03-22": [
      { subject: "Programação", chapter: "React Hooks" }
    ]
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">CRONOGRAMA</h1>
      
      <StudyCalendar
        date={date}
        setDate={setDate}
        studySessionsByDate={studySessionsByDate}
        setCalendarDialogOpen={setCalendarDialogOpen}
      />

      <GoogleCalendarDialog
        open={calendarDialogOpen}
        onOpenChange={setCalendarDialogOpen}
      />
    </div>
  )
}

export default UniversitarioCronograma