import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Timer, Sun, Moon } from "lucide-react"
import { StudyTimerDialog } from "@/components/StudyTimerDialog"
import { VestibularNavigation } from "./VestibularNavigation"
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"

const VestibularLayout = ({ children }: { children: React.ReactNode }) => {
  const [timerDialogOpen, setTimerDialogOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const { user } = useAuth()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
      <VestibularNavigation />
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
          onClick={() => setTimerDialogOpen(true)}
        >
          <Timer className="h-5 w-5" />
        </Button>
      </div>

      <StudyTimerDialog
        open={timerDialogOpen}
        onOpenChange={setTimerDialogOpen}
      />
    </div>
  )
}

export default VestibularLayout