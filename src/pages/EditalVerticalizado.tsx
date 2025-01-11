import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Percent, Target, Plus, Settings } from "lucide-react"
import { AddStudyDialog } from "@/components/AddStudyDialog"

interface Topic {
  id: number
  name: string
  progress: number
  exercisesDone: number
  correctAnswers: number
  wrongAnswers: number
}

interface Subject {
  name: string
  icon: string
  progress: number
  exercisesDone: number
  correctAnswers: number
  wrongAnswers: number
  topics: Topic[]
}

const EditalVerticalizado = () => {
  // Mock data - replace with real data later
  const subjects: Subject[] = [
    {
      name: "MICROBIOLOGIA MÉDICA",
      icon: "🧬",
      progress: 0,
      exercisesDone: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      topics: [
        {
          id: 1,
          name: "CONTEÚDO",
          progress: 0,
          exercisesDone: 0,
          correctAnswers: 0,
          wrongAnswers: 0
        },
        {
          id: 2,
          name: "EVOLUÇÃO HISTPA",
          progress: 0,
          exercisesDone: 0,
          correctAnswers: 0,
          wrongAnswers: 0
        },
        {
          id: 3,
          name: "EQUIPAMENTOS",
          progress: 0,
          exercisesDone: 0,
          correctAnswers: 0,
          wrongAnswers: 0
        }
      ]
    }
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">EDITAL VERTICALIZADO</h1>
          <div className="flex items-center gap-2">
            <AddStudyDialog />
            <Button variant="secondary" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              CONFIGURAÇÕES
            </Button>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">DADOS GERAIS</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                TEMPO DE ESTUDO
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0h</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                % EDITAL
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <Progress value={0} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                DESEMPENHO
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <Progress value={0} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Course Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🎓 SEGUNDO ANO - MEDICINA
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Subjects */}
        {subjects.map((subject, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span>{subject.icon}</span>
                {subject.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground mb-2">
                  <div>% Concluída da Disciplina</div>
                  <div className="text-center">Exercícios feitos</div>
                  <div className="text-center">Acertos</div>
                  <div className="text-center">Erros</div>
                </div>
                <div className="grid grid-cols-4 text-sm mb-4">
                  <div>
                    <Progress value={subject.progress} className="w-32" />
                    <span className="text-xs">{subject.progress}%</span>
                  </div>
                  <div className="text-center">{subject.exercisesDone}</div>
                  <div className="text-center text-green-600">{subject.correctAnswers} ({subject.correctAnswers}%)</div>
                  <div className="text-center text-red-600">{subject.wrongAnswers} ({subject.wrongAnswers}%)</div>
                </div>

                {/* Topics */}
                {subject.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="pl-6 border-l-2 border-gray-100">
                    <div className="grid grid-cols-4 text-sm mb-2">
                      <div>{topic.id} - {topic.name}</div>
                      <div className="text-center">{topic.exercisesDone}</div>
                      <div className="text-center text-green-600">{topic.correctAnswers}</div>
                      <div className="text-center text-red-600">{topic.wrongAnswers}</div>
                    </div>
                    <div className="grid grid-cols-4 text-xs text-muted-foreground mb-4">
                      <div>
                        <span>% Concluída do Tópico</span>
                        <Progress value={topic.progress} className="w-32 mt-1" />
                        <span>{topic.progress}%</span>
                      </div>
                      <div className="text-center">Exercícios feitos</div>
                      <div className="text-center">Acertos</div>
                      <div className="text-center">Erros</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default EditalVerticalizado