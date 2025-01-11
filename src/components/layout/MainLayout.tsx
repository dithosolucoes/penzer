import { TopNavigation } from "./TopNavigation"
import { Button } from "@/components/ui/button"
import { Timer } from "lucide-react"
import { StudyTimerDialog } from "@/components/StudyTimerDialog"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [timerDialogOpen, setTimerDialogOpen] = useState(false)
  const { user } = useAuth()

  // Se não houver usuário, renderiza apenas o conteúdo sem o layout
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <TopNavigation />
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>

      {/* Timer Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg bg-white hover:bg-gray-100"
          onClick={() => setTimerDialogOpen(true)}
        >
          <Timer className="h-5 w-5" />
        </Button>
      </div>

      {/* Timer Dialog */}
      <StudyTimerDialog
        open={timerDialogOpen}
        onOpenChange={setTimerDialogOpen}
      />
    </div>
  )
}

export default MainLayout