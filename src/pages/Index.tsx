import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, CheckCircle2, Clock, Target } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-black to-[#F2CED0] bg-clip-text text-transparent">
            Olá, Estudante!
          </h1>
          <p className="text-gray-600">
            Vamos organizar seus estudos para hoje?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#F2CED0]/20 rounded">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-semibold">Horas Estudadas</h3>
            </div>
            <p className="text-2xl font-bold">4h 30min</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#F2CED0]/20 rounded">
                <Target className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-semibold">Meta Diária</h3>
            </div>
            <p className="text-2xl font-bold">6h 00min</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#F2CED0]/20 rounded">
                <CheckCircle2 className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-semibold">Tarefas Concluídas</h3>
            </div>
            <p className="text-2xl font-bold">3/5</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#F2CED0]/20 rounded">
                <Calendar className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-semibold">Revisões Hoje</h3>
            </div>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Tarefas para Hoje
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((task) => (
                  <div key={task} className="p-4 border rounded-lg hover:border-[#F2CED0] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Direito Constitucional</h3>
                      <span className="text-sm text-gray-500">2h estimadas</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Estudar capítulo sobre Direitos Fundamentais
                    </p>
                  </div>
                ))}
                <Button className="w-full bg-[#F2CED0] text-black hover:bg-[#F2CED0]/90">
                  Adicionar Nova Tarefa
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Seu Progresso</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Meta Diária</span>
                  <span className="text-sm text-gray-500">75%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-[#F2CED0] rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Meta Semanal</span>
                  <span className="text-sm text-gray-500">60%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-[#F2CED0] rounded-full w-3/5"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Meta Mensal</span>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-[#F2CED0] rounded-full w-5/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index