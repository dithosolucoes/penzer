import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function AddSimuladoDialog() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState("")
  const [duration, setDuration] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [tags, setTags] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const simuladoData = {
      title,
      category,
      subcategory,
      difficulty,
      questions: Number(questions),
      duration,
      date,
      tags: tags.split(',').map(tag => tag.trim()),
      status: 'pending'
    }

    console.log('Dados do simulado:', simuladoData)
    
    toast({
      title: "Simulado criado",
      description: "O novo simulado foi criado com sucesso.",
    })
  }

  const getSubcategories = () => {
    switch (category) {
      case "enem":
        return ["Linguagens", "Matemática", "Ciências Humanas", "Ciências da Natureza", "Redação"]
      case "medicina":
        return ["Anatomia", "Bioquímica", "Fisiologia", "Genética"]
      case "direito":
        return ["Constitucional", "Civil", "Penal", "Administrativo"]
      case "engenharia":
        return ["Cálculo", "Física", "Química", "Geometria"]
      default:
        return []
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#F2CED0] hover:bg-[#F2CED0]/80 text-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          NOVO SIMULADO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            CRIAR NOVO SIMULADO
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Título em largura completa */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Simulado ENEM 2024"
              required
            />
          </div>

          {/* Grid de 2 colunas para os demais campos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Categoria
              </label>
              <Select value={category} onValueChange={(value) => {
                setCategory(value)
                setSubcategory("")
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enem">ENEM</SelectItem>
                  <SelectItem value="fuvest">FUVEST</SelectItem>
                  <SelectItem value="unicamp">UNICAMP</SelectItem>
                  <SelectItem value="medicina">Medicina</SelectItem>
                  <SelectItem value="direito">Direito</SelectItem>
                  <SelectItem value="engenharia">Engenharia</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {category ? (
              <div className="space-y-2">
                <label htmlFor="subcategory" className="text-sm font-medium">
                  Subcategoria
                </label>
                <Select value={subcategory} onValueChange={setSubcategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma subcategoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSubcategories().map((sub) => (
                      <SelectItem key={sub} value={sub.toLowerCase()}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : <div />}

            <div className="space-y-2">
              <label htmlFor="difficulty" className="text-sm font-medium">
                Nível de Dificuldade
              </label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facil">Fácil</SelectItem>
                  <SelectItem value="medio">Médio</SelectItem>
                  <SelectItem value="dificil">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="questions" className="text-sm font-medium">
                Número de Questões
              </label>
              <Input
                id="questions"
                type="number"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder="Ex: 180"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">
                Duração
              </label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ex: 5h30"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Data
              </label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Tags em largura completa */}
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags (separadas por vírgula)
            </label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: vestibular, exatas, 2024"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-[#F2CED0] hover:bg-[#F2CED0]/80 text-gray-800"
            >
              Criar Simulado
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}