import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Info } from "lucide-react"

interface StudyTimerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudyTimerDialog({ open, onOpenChange }: StudyTimerDialogProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [showMiniTimer, setShowMiniTimer] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning])

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
    if (!isRunning && selectedSubject && selectedTopic) {
      onOpenChange(false)
      setShowMiniTimer(true)
    }
  }

  const handleFinishStudy = () => {
    setIsRunning(false)
    setTime(0)
    setShowMiniTimer(false)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isRunning ? "ESTUDO EM ANDAMENTO" : "INICIAR ESTUDO"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="NOME DA DISCIPLINA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="microbiologia">MICROBIOLOGIA MÉDICA</SelectItem>
                <SelectItem value="anatomia">ANATOMIA</SelectItem>
                <SelectItem value="fisiologia">FISIOLOGIA</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger>
                <SelectValue placeholder="TÓPICO" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="topic1">CONTEÚDO 1</SelectItem>
                <SelectItem value="topic2">CONTEÚDO 2</SelectItem>
                <SelectItem value="topic3">CONTEÚDO 3</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative bg-gray-100 rounded-lg p-8">
              <div className="absolute top-2 right-2">
                <Info className="h-5 w-5 text-gray-500" />
              </div>
              <div className="text-4xl font-mono text-center">
                {formatTime(time)}
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={handleStartStop}
                >
                  {isRunning ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {isRunning && (
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  CANCELAR
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={handleFinishStudy}
                className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
              >
                FINALIZAR ESTUDO
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mini Timer - Updated with pink color and reorganized layout */}
      {showMiniTimer && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-4 max-w-[400px]">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white/80 hover:bg-white/10 p-1 h-8 w-8"
            onClick={handleStartStop}
          >
            {isRunning ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>

          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">
              {selectedSubject === "microbiologia" ? "MICROBIOLOGIA MÉDICA" : 
               selectedSubject === "anatomia" ? "ANATOMIA" : 
               selectedSubject === "fisiologia" ? "FISIOLOGIA" : ""} •{" "}
              {selectedTopic === "topic1" ? "CONTEÚDO 1" : 
               selectedTopic === "topic2" ? "CONTEÚDO 2" : 
               selectedTopic === "topic3" ? "CONTEÚDO 3" : ""}
            </div>
            <div className="text-lg font-mono text-[#FFDEE2]">
              {formatTime(time)}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white/80 hover:bg-white/10 px-2 py-1 h-auto text-xs"
            onClick={handleFinishStudy}
          >
            finalizar
          </Button>
        </div>
      )}
    </>
  )
}