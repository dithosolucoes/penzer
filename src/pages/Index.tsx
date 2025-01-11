import { Button } from "@/components/ui/button"
import { AuthUI } from "@/components/auth/AuthUI"
import { useAuth } from "@/hooks/useAuth"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { useState } from "react"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { GoogleCalendarDialog } from "@/components/GoogleCalendarDialog"
import { TaskList } from "@/components/home/TaskList"
import { StudyCycle } from "@/components/home/StudyCycle"
import { ReviewTable } from "@/components/home/ReviewTable"
import { StudyCalendar } from "@/components/home/StudyCalendar"

const Index = () => {
  const { user } = useAuth()
  const [date, setDate] = useState<Date>(new Date())
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)

  const { data: studySessions } = useQuery({
    queryKey: ['study-sessions', format(date, 'yyyy-MM')],
    queryFn: async () => {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      
      const { data, error } = await supabase
        .from('study_sessions')
        .select('*')
        .gte('start_time', startOfMonth.toISOString())
        .lte('start_time', endOfMonth.toISOString())
      
      if (error) throw error
      return data
    },
    enabled: !!user
  })

  // Create a map of dates to study sessions for easier lookup
  const studySessionsByDate = studySessions?.reduce((acc, session) => {
    const dateKey = format(new Date(session.start_time), 'yyyy-MM-dd')
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(session)
    return acc
  }, {} as Record<string, typeof studySessions>)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-6 space-y-8">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-2xl font-bold">Bem-vindo ao Sistema de Estudos</h1>
            <p className="text-muted-foreground text-center">
              Faça login para acessar sua área de estudos
            </p>
          </div>
          <AuthUI />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">MEU DIA</h1>
          <AddStudyDialog>
            <Button 
              variant="secondary" 
              size="sm"
              type="button"
              className="font-medium"
            >
              ADICIONAR ESTUDO
            </Button>
          </AddStudyDialog>
        </div>

        <TaskList />
        <StudyCycle />
        <ReviewTable />
        <StudyCalendar 
          date={date}
          setDate={setDate}
          studySessionsByDate={studySessionsByDate || {}}
          setCalendarDialogOpen={setCalendarDialogOpen}
        />
      </div>

      {/* Google Calendar Dialog */}
      <GoogleCalendarDialog
        open={calendarDialogOpen}
        onOpenChange={setCalendarDialogOpen}
      />
    </div>
  )
}

export default Index