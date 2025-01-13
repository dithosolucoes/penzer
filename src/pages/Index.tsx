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
import { BookOpen } from "lucide-react"
import { motion } from "framer-motion"

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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F2CED0]">
        {/* Animated background circles */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-[#9b87f5]/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-[#7E69AB]/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [-100, 0, -100],
            y: [50, 0, 50],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="w-full max-w-md p-8 relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="p-3 bg-white rounded-xl shadow-lg mb-4">
              <BookOpen className="w-10 h-10 text-[#9b87f5]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1A1F2C] mb-2">
              Bem-vindo a Penzer
            </h1>
            <p className="text-sm text-[#6E59A5] text-center">
              Sua jornada de estudos começa aqui
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
          >
            <AuthUI />
          </motion.div>
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

      <GoogleCalendarDialog
        open={calendarDialogOpen}
        onOpenChange={setCalendarDialogOpen}
      />
    </div>
  )
}

export default Index
