import { TopNavigation } from "./TopNavigation"
import { Button } from "@/components/ui/button"
import { Timer, Sun, Moon } from "lucide-react"
import { StudyTimerDialog } from "@/components/StudyTimerDialog"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [timerDialogOpen, setTimerDialogOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const { user } = useAuth()

  useEffect(() => {
    // Check if user has a theme preference stored
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Se não houver usuário, renderiza apenas o conteúdo sem o layout
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
      <TopNavigation />
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>

      {/* Fixed Buttons */}
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

      {/* Timer Dialog */}
      <StudyTimerDialog
        open={timerDialogOpen}
        onOpenChange={setTimerDialogOpen}
      />
    </div>
  )
}

export default MainLayout