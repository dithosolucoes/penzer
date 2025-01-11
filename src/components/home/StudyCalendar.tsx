import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { DayContent } from "react-day-picker"

interface StudyCalendarProps {
  date: Date
  setDate: (date: Date) => void
  studySessionsByDate: Record<string, any[]>
  setCalendarDialogOpen: (open: boolean) => void
}

export const StudyCalendar = ({ 
  date, 
  setDate, 
  studySessionsByDate,
  setCalendarDialogOpen 
}: StudyCalendarProps) => {
  const renderDay = (day: Date, props: typeof DayContent) => {
    const dateKey = format(day, 'yyyy-MM-dd')
    const sessions = studySessionsByDate?.[dateKey]

    if (!sessions?.length) {
      return <div {...props}>{format(day, 'd')}</div>
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div {...props} className="relative">
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
  )
}