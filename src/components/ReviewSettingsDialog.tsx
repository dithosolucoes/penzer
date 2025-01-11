import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Settings } from "lucide-react"
import { useState } from "react"

export function ReviewSettingsDialog() {
  const [reviewDays, setReviewDays] = useState<number[]>([2, 7, 15, 30, 60])
  const [newDay, setNewDay] = useState<string>("")

  const handleAddDay = () => {
    const dayNumber = parseInt(newDay)
    if (!isNaN(dayNumber) && dayNumber > 0) {
      setReviewDays([...reviewDays, dayNumber].sort((a, b) => a - b))
      setNewDay("")
    }
  }

  const handleRemoveDay = (dayToRemove: number) => {
    setReviewDays(reviewDays.filter(day => day !== dayToRemove))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>CONFIGURAÇÕES DE REVISÕES</DialogTitle>
          <DialogDescription>
            Configure os dias padrões para suas revisões
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-wrap gap-2">
            {reviewDays.map((day) => (
              <div
                key={day}
                className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1"
              >
                <span className="text-sm">{day} dias</span>
                <button
                  onClick={() => handleRemoveDay(day)}
                  className="ml-1 rounded-full hover:bg-secondary-foreground/10 p-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              placeholder="Adicionar dias"
              value={newDay}
              onChange={(e) => setNewDay(e.target.value)}
              className="max-w-[150px]"
            />
            <Button onClick={handleAddDay} type="button">
              Adicionar
            </Button>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <DialogTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogTrigger>
          <Button type="submit">Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}