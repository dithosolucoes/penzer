import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const AddSubjectDialog = () => {
  const [open, setOpen] = useState(false)
  const [novaMateria, setNovaMateria] = useState("")
  const [area, setArea] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novaMateria || !area) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar matéria",
        description: "Por favor, preencha todos os campos."
      })
      return
    }
    
    toast({
      title: "Matéria adicionada com sucesso!",
      description: `${novaMateria} foi adicionada à área de ${area}.`
    })
    
    setOpen(false)
    setNovaMateria("")
    setArea("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          size="sm"
          className="font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          ADICIONAR MATÉRIA
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Matéria</DialogTitle>
          <DialogDescription>
            Adicione uma nova matéria ao seu plano de estudos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Matéria</Label>
              <Input
                id="nome"
                placeholder="Ex: Matemática"
                value={novaMateria}
                onChange={(e) => setNovaMateria(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Área</Label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exatas">Exatas</SelectItem>
                  <SelectItem value="humanas">Humanas</SelectItem>
                  <SelectItem value="biologicas">Biológicas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Adicionar Matéria</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddSubjectDialog