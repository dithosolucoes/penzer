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
import { BookOpen, GraduationCap, Brain, Target } from "lucide-react"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2FCE2] to-[#E5DEFF]">
        <div className="w-full max-w-md p-8 space-y-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-white rounded-full shadow-xl"
            >
              <BookOpen className="w-16 h-16 text-[#8B5CF6]" />
            </motion.div>

            {/* Animated Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-[#1A1F2C] text-center"
            >
              Bem-vindo ao seu Caminho de Estudos
            </motion.h1>

            {/* Animated Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-center max-w-sm"
            >
              Organize, acompanhe e alcance seus objetivos de estudo com nossa plataforma inteligente
            </motion.p>

            {/* Study Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-4 w-full mt-4"
            >
              <div className="flex flex-col items-center p-3 bg-white/50 rounded-lg">
                <GraduationCap className="w-6 h-6 text-[#9b87f5] mb-2" />
                <span className="text-xs text-center">Plano de Estudos</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/50 rounded-lg">
                <Brain className="w-6 h-6 text-[#7E69AB] mb-2" />
                <span className="text-xs text-center">Revisão Inteligente</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/50 rounded-lg">
                <Target className="w-6 h-6 text-[#6E59A5] mb-2" />
                <span className="text-xs text-center">Metas Diárias</span>
              </div>
            </motion.div>
          </div>

          {/* Auth UI with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
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