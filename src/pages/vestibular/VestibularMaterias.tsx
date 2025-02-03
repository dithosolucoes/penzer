import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, BookOpen, GraduationCap } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

const materias = {
  exatas: [
    { nome: "Matemática", progresso: 75, questoesResolvidas: 150, horasEstudadas: 24 },
    { nome: "Física", progresso: 60, questoesResolvidas: 120, horasEstudadas: 18 },
    { nome: "Química", progresso: 45, questoesResolvidas: 90, horasEstudadas: 15 }
  ],
  humanas: [
    { nome: "História", progresso: 80, questoesResolvidas: 130, horasEstudadas: 20 },
    { nome: "Geografia", progresso: 70, questoesResolvidas: 110, horasEstudadas: 16 },
    { nome: "Literatura", progresso: 65, questoesResolvidas: 100, horasEstudadas: 14 }
  ],
  biologicas: [
    { nome: "Biologia", progresso: 55, questoesResolvidas: 95, horasEstudadas: 17 },
    { nome: "Anatomia", progresso: 40, questoesResolvidas: 75, horasEstudadas: 12 }
  ]
}

const VestibularMaterias = () => {
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
    
    // Aqui você adicionaria a lógica para salvar a nova matéria
    toast({
      title: "Matéria adicionada com sucesso!",
      description: `${novaMateria} foi adicionada à área de ${area}.`
    })
    
    setOpen(false)
    setNovaMateria("")
    setArea("")
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">MATÉRIAS</h1>
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
      </div>

      {/* Seção de Exatas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Exatas
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {materias.exatas.map((materia) => (
            <Card key={materia.nome} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#F2CED0]" />
                  <h3 className="font-semibold">{materia.nome}</h3>
                </div>
                <span className="text-sm font-medium text-green-600">{materia.progresso}%</span>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#F2CED0] h-2 rounded-full" 
                    style={{ width: `${materia.progresso}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{materia.questoesResolvidas} questões</span>
                  <span>{materia.horasEstudadas}h estudadas</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Seção de Humanas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Humanas
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {materias.humanas.map((materia) => (
            <Card key={materia.nome} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#F2CED0]" />
                  <h3 className="font-semibold">{materia.nome}</h3>
                </div>
                <span className="text-sm font-medium text-green-600">{materia.progresso}%</span>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#F2CED0] h-2 rounded-full" 
                    style={{ width: `${materia.progresso}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{materia.questoesResolvidas} questões</span>
                  <span>{materia.horasEstudadas}h estudadas</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Seção de Biológicas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Biológicas
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {materias.biologicas.map((materia) => (
            <Card key={materia.nome} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#F2CED0]" />
                  <h3 className="font-semibold">{materia.nome}</h3>
                </div>
                <span className="text-sm font-medium text-green-600">{materia.progresso}%</span>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#F2CED0] h-2 rounded-full" 
                    style={{ width: `${materia.progresso}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{materia.questoesResolvidas} questões</span>
                  <span>{materia.horasEstudadas}h estudadas</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VestibularMaterias