import { Button } from "@/components/ui/button"
import { AddStudyDialog } from "@/components/AddStudyDialog"

const Revisoes = () => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">REVISÕES</h1>
        <AddStudyDialog>
          <Button variant="secondary" size="sm">
            ADICIONAR ESTUDO
          </Button>
        </AddStudyDialog>
      </div>
      
      {/* Conteúdo das revisões será implementado aqui */}
      <div className="text-center text-gray-500">
        Em desenvolvimento...
      </div>
    </div>
  )
}

export default Revisoes