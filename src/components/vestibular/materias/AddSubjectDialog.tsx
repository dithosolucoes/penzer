import { useState } from "react"
import { BookOpen, GraduationCap, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
          className="font-medium bg-[#F2CED0] hover:bg-[#F2CED0]/80 text-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          ADICIONAR MATÉRIA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="w-5 h-5" />
            Adicionar Nova Matéria
          </DialogTitle>
          <DialogDescription className="text-base">
            Adicione uma nova matéria ao seu plano de estudos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-medium">
                Nome da Matéria
              </Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <Input
                  id="nome"
                  placeholder="Ex: Matemática"
                  value={novaMateria}
                  onChange={(e) => setNovaMateria(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area" className="text-sm font-medium">
                Área
              </Label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger className="w-full pl-10 relative">
                  <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exatas" className="cursor-pointer">Exatas</SelectItem>
                  <SelectItem value="humanas" className="cursor-pointer">Humanas</SelectItem>
                  <SelectItem value="biologicas" className="cursor-pointer">Biológicas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setOpen(false)}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-[#F2CED0] hover:bg-[#F2CED0]/80 text-gray-800 gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Matéria
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddSubjectDialog