import { Button } from "@/components/ui/button"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { Card, CardContent } from "@/components/ui/card"
import { ReviewSettingsDialog } from "@/components/ReviewSettingsDialog"
import { useState } from "react"

const Revisoes = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">REVISÕES</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSettingsOpen(true)}
          >
            CONFIGURAR REVISÕES
          </Button>
          <AddStudyDialog>
            <Button variant="secondary" size="sm">
              ADICIONAR ESTUDO
            </Button>
          </AddStudyDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">REVISÕES DE HOJE</h3>
            <div className="text-sm text-gray-500">
              Nenhuma revisão programada para hoje
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">PRÓXIMAS REVISÕES</h3>
            <div className="text-sm text-gray-500">
              Nenhuma revisão programada
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">REVISÕES ATRASADAS</h3>
            <div className="text-sm text-gray-500">
              Nenhuma revisão atrasada
            </div>
          </CardContent>
        </Card>
      </div>

      <ReviewSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  )
}

export default Revisoes