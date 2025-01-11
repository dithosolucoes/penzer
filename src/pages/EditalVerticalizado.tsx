import { Button } from "@/components/ui/button"
import { AddStudyDialog } from "@/components/AddStudyDialog"

const EditalVerticalizado = () => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">EDITAL VERTICALIZADO</h1>
        <AddStudyDialog>
          <Button variant="secondary" size="sm">
            ADICIONAR ESTUDO
          </Button>
        </AddStudyDialog>
      </div>
      
      {/* Conteúdo do edital verticalizado será implementado aqui */}
      <div className="text-center text-gray-500">
        Em desenvolvimento...
      </div>
    </div>
  )
}

export default EditalVerticalizado