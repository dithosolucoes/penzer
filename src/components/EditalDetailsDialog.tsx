import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface EditalDetailsDialogProps {
  edital: {
    id: number
    title: string
    organization: string
    year: string
    image: string
    vagas: number
  }
}

interface Subject {
  name: string
  topics: string[]
}

// Exemplo de disciplinas e tópicos - isso viria do backend posteriormente
const subjects: Subject[] = [
  {
    name: "LÍNGUA PORTUGUESA",
    topics: [
      "1 - COMPREENSÃO E INTERPRETAÇÃO DE TEXTOS DE GÊNE...",
      "2 - RECONHECIMENTO DE TIPOS E GÊNEROS TEXTUAIS",
      "3 - DOMÍNIO DA ORTOGRAFIA OFICIAL"
    ]
  }
]

export function EditalDetailsDialog({ edital }: EditalDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="secondary"
          size="sm" 
          className="w-full bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
        >
          VER EDITAL
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            DETALHES DO EDITAL
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* Cabeçalho com informações do edital */}
          <div className="flex gap-6 items-start mb-8">
            <img 
              src={edital.image} 
              alt={edital.organization}
              className="w-24 h-24 object-contain"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4">
                {edital.organization} - {edital.year}
              </h2>
              <div className="space-y-2">
                <p><strong>Cargo:</strong> {edital.title}</p>
                <p><strong>Data Prova:</strong> 26/06/2021</p>
                <p><strong>Vagas:</strong> {edital.vagas}</p>
                <p><strong>Salário:</strong> R$ 6.030,23</p>
              </div>
            </div>
          </div>

          {/* Lista de disciplinas e tópicos */}
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 p-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <span className="bg-black text-white p-1 rounded">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"/>
                      </svg>
                    </span>
                    {subject.name}
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  {subject.topics.map((topic, topicIndex) => (
                    <p key={topicIndex} className="text-sm">
                      {topic}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Botões de ação */}
          <div className="flex justify-between mt-8">
            <DialogClose asChild>
              <Button variant="outline">
                CANCELAR
              </Button>
            </DialogClose>
            <Button>
              ESCOLHER EDITAL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}