import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"

type PomodoroSettings = {
  work_duration: number
  break_duration: number
  long_break_duration: number
  sessions_until_long_break: number
}

export function PomodoroTimer() {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  
  const { data: settings } = useQuery({
    queryKey: ['pomodoro-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pomodoro_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single()
      
      if (error) throw error
      return data as PomodoroSettings
    },
    enabled: !!user
  })

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: Partial<PomodoroSettings>) => {
      const { error } = await supabase
        .from('pomodoro_settings')
        .update(newSettings)
        .eq('user_id', user?.id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pomodoro-settings'] })
      toast({
        title: "Configurações atualizadas",
        description: "Suas configurações do Pomodoro foram salvas com sucesso."
      })
    }
  })

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (!isBreak) {
        const newSessionCount = sessionCount + 1
        setSessionCount(newSessionCount)
        
        if (newSessionCount % (settings?.sessions_until_long_break || 4) === 0) {
          setTimeLeft((settings?.long_break_duration || 15) * 60)
        } else {
          setTimeLeft((settings?.break_duration || 5) * 60)
        }
        
        setIsBreak(true)
        toast({
          title: "Tempo de descanso!",
          description: "Parabéns! Agora é hora de fazer uma pausa."
        })
      } else {
        setTimeLeft((settings?.work_duration || 25) * 60)
        setIsBreak(false)
        toast({
          title: "Hora de voltar ao trabalho!",
          description: "Sua pausa terminou. Vamos continuar?"
        })
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak, sessionCount, settings, toast])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timer Pomodoro</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
          <div className="text-sm text-muted-foreground mb-4">
            {isBreak ? 'Tempo de descanso' : 'Tempo de foco'} • Sessão {sessionCount + 1}
          </div>
        </div>
        
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "destructive" : "default"}
          >
            {isRunning ? "Pausar" : "Iniciar"}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              setIsRunning(false)
              setTimeLeft(settings?.work_duration ? settings.work_duration * 60 : 25 * 60)
              setIsBreak(false)
              setSessionCount(0)
            }}
          >
            Reiniciar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}