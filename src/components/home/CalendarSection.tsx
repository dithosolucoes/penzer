import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { GoogleCalendarDialog } from "@/components/GoogleCalendarDialog"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export const CalendarSection = () => {
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

  const renderDay = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd')
    const sessions = studySessionsByDate?.[dateKey]

    if (!sessions?.length) {
      return format(day, 'd')
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full h-full flex items-center justify-center">
            <div className="relative">
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

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">CALENDÁRIO</h2>
        <Button
          variant="outline"
          size="sm"
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
              Day: ({ date: dayDate }) => renderDay(dayDate),
            }}
          />
        </div>
      </div>

      <GoogleCalendarDialog
        open={calendarDialogOpen}
        onOpenChange={setCalendarDialogOpen}
      />
    </div>
  )
}