import { Button } from "@/components/ui/button"
import { AuthUI } from "@/components/auth/AuthUI"
import { useAuth } from "@/hooks/useAuth"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { TasksSection } from "@/components/home/TasksSection"
import { StudyCycleSection } from "@/components/home/StudyCycleSection"
import { ReviewSection } from "@/components/home/ReviewSection"
import { CalendarSection } from "@/components/home/CalendarSection"

const Index = () => {
  const { user } = useAuth()

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
              className="font-medium"
            >
              ADICIONAR ESTUDO
            </Button>
          </AddStudyDialog>
        </div>

        <TasksSection />
        <StudyCycleSection />
        <ReviewSection />
        <CalendarSection />
      </div>
    </div>
  )
}

export default Index