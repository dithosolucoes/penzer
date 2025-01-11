import { Button } from "@/components/ui/button"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const EditalVerticalizado = () => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">DADOS GERAIS</h1>
        <AddStudyDialog>
          <Button variant="secondary" size="sm">
            ADICIONAR ESTUDO
          </Button>
        </AddStudyDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-center mb-4">TEMPO DE ESTUDO</h3>
            <p className="text-center text-2xl font-bold">1h 47min</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-center mb-4">% EDITAL</h3>
            <div className="space-y-2">
              <Progress value={33.33} />
              <p className="text-center">33.33%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-center mb-4">DESEMPENHO</h3>
            <div className="space-y-2">
              <Progress value={0} />
              <p className="text-center">0%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 rounded bg-gray-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <h2 className="text-lg font-semibold">SEGUNDO ANO - MEDICINA</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 rounded bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">MICROBIOLOGIA MÉDICA</h3>
                <div className="flex justify-between items-center mt-2">
                  <Progress value={33} className="w-1/3" />
                  <div className="text-sm text-gray-500">
                    <span>Exercícios: 0</span>
                    <span className="mx-2">|</span>
                    <span>Acertos: 0 (0%)</span>
                    <span className="mx-2">|</span>
                    <span>Erros: 0 (0%)</span>
                  </div>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex justify-between items-center w-full pr-4">
                    <span>1 - CONTEÚDO</span>
                    <div className="flex items-center gap-4">
                      <Progress value={100} className="w-24" />
                      <span className="text-sm text-gray-500">100%</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    <div className="text-sm text-gray-500">
                      Exercícios: 0 | Acertos: 0 | Erros: 0
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex justify-between items-center w-full pr-4">
                    <span>2 - EVOLUÇÃO HISTPIA</span>
                    <div className="flex items-center gap-4">
                      <Progress value={0} className="w-24" />
                      <span className="text-sm text-gray-500">0%</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    <div className="text-sm text-gray-500">
                      Exercícios: 0 | Acertos: 0 | Erros: 0
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex justify-between items-center w-full pr-4">
                    <span>3 - EQUIPAMENTOS</span>
                    <div className="flex items-center gap-4">
                      <Progress value={0} className="w-24" />
                      <span className="text-sm text-gray-500">0%</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    <div className="text-sm text-gray-500">
                      Exercícios: 0 | Acertos: 0 | Erros: 0
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditalVerticalizado