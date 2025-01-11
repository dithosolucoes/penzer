import { Button } from "@/components/ui/button"
import { BookOpen, Calendar as CalendarIcon } from "lucide-react"
import { AuthUI } from "@/components/auth/AuthUI"
import { useAuth } from "@/hooks/useAuth"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { GoogleCalendarDialog } from "@/components/GoogleCalendarDialog"

const Index = () => {
  const { user } = useAuth()
  const { toast } = useToast()
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

  // Custom day render function for the calendar with proper TypeScript types
  const renderDay = (day: Date, cellProps: { [key: string]: any }) => {
    const dateKey = format(day, 'yyyy-MM-dd')
    const sessions = studySessionsByDate?.[dateKey]

    if (!sessions?.length) {
      return <div {...cellProps}>{format(day, 'd')}</div>
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div {...cellProps} className="relative">
              {format(day, 'd')}
              <div className="w-2 h-2 bg-green-500 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <p className="font-medium">{sessions.length} estudo(s)</p>
              {sessions.map((session, i) => (
                <p key={i} className="text-xs text-gray-500">
                  {session.subject} - {session.chapter}
                </p>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

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

        {/* Tasks Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">A FAZER HOJE</h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8E8E8] text-sm font-medium">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">MICROBIOLOGIA MÉDICA</span>
                    </div>
                    <span className="text-xs text-gray-500">VER ONDE PAREI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Cycle Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">MEU CICLO DE ESTUDOS</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between p-3 bg-[#E8E8E8]/30 rounded">
              <span className="font-medium">MICROBIOLOGIA MÉDICA</span>
              <input type="checkbox" className="rounded border-gray-300" />
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">PARA REVISAR HOJE</h2>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#E8E8E8]/30">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">DATA</th>
                  <th className="px-4 py-3 text-left font-medium">EDITAL</th>
                  <th className="px-4 py-3 text-left font-medium">DISCIPLINA/CAPÍTULO</th>
                  <th className="px-4 py-3 text-left font-medium">ASSUNTOS</th>
                  <th className="px-4 py-3 text-left font-medium">HISTÓRICO DE REVISÕES</th>
                  <th className="px-4 py-3 text-left font-medium">PÁG. LIDAS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3" colSpan={6}>
                    Nenhuma revisão programada para hoje
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">CALENDÁRIO</h2>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setCalendarDialogOpen(true)}
              className="gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Conectar Google Agenda
            </Button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex gap-4 items-start">
              <Select
                value={format(date, 'MMMM', { locale: ptBR })}
                onValueChange={(value) => {
                  const newDate = new Date(date)
                  newDate.setMonth(parseInt(value))
                  setDate(newDate)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {format(new Date(2024, i, 1), 'MMMM', { locale: ptBR })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border"
                locale={ptBR}
                components={{
                  Day: ({ date: dayDate, ...props }) => renderDay(dayDate, props),
                }}
              />
            </div>
          </div>
        </div>
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
