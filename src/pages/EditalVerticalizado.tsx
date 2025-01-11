import { Button } from "@/components/ui/button"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { Card, CardContent } from "@/components/ui/card"
import { EditEditalSheet } from "@/components/EditEditalSheet"
import { useState } from "react"

const EditalVerticalizado = () => {
  const [editSheetOpen, setEditSheetOpen] = useState(false)
  const [selectedEditalTitle, setSelectedEditalTitle] = useState("")

  const handleEditEdital = (title: string) => {
    setSelectedEditalTitle(title)
    setEditSheetOpen(true)
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleEditEdital("RESIDÊNCIA EM CLÍNICA MÉDICA - HOSPITAL DAS CLÍNICAS FMUSP")}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">RESIDÊNCIA EM CLÍNICA MÉDICA - HOSPITAL DAS CLÍNICAS FMUSP</h3>
            <p className="text-sm text-gray-500">Última atualização: 10/01/2024</p>
          </CardContent>
        </Card>
      </div>

      <EditEditalSheet 
        open={editSheetOpen} 
        onOpenChange={setEditSheetOpen}
        editalTitle={selectedEditalTitle}
      />
    </div>
  )
}

export default EditalVerticalizado