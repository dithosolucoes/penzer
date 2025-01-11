import { TopNavigation } from "./TopNavigation"
import { Button } from "@/components/ui/button"
import { Timer } from "lucide-react"
import { StudyTimerDialog } from "@/components/StudyTimerDialog"
import { useState } from "react"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [timerDialogOpen, setTimerDialogOpen] = useState(false)

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