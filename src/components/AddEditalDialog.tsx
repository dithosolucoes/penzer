import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload, X, Save } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useQueryClient } from "@tanstack/react-query"

interface Discipline {
  id: string;
  name: string;
  topics: string[];
}

export function AddEditalDialog() {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")
  const [disciplines, setDisciplines] = useState<Discipline[]>([])
  const [editalData, setEditalData] = useState({
    title: "",
    organization: "",
    year: new Date().getFullYear().toString(),
    vagas: "",
    salary: "",
    examDate: "",
  })

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addDiscipline = () => {
    setDisciplines([
      ...disciplines,
      { id: crypto.randomUUID(), name: "", topics: [] }
    ])
  }

  const removeDiscipline = (id: string) => {
    setDisciplines(disciplines.filter(d => d.id !== id))
  }

  const addTopic = (disciplineId: string) => {
    setDisciplines(disciplines.map(d => {
      if (d.id === disciplineId) {
        return { ...d, topics: [...d.topics, ""] }
      }
      return d
    }))
  }

  const updateTopic = (disciplineId: string, topicIndex: number, value: string) => {
    setDisciplines(disciplines.map(d => {
      if (d.id === disciplineId) {
        const newTopics = [...d.topics]
        newTopics[topicIndex] = value
        return { ...d, topics: newTopics }
      }
      return d
    }))
  }

  const removeTopic = (disciplineId: string, topicIndex: number) => {
    setDisciplines(disciplines.map(d => {
      if (d.id === disciplineId) {
        const newTopics = d.topics.filter((_, index) => index !== topicIndex)
        return { ...d, topics: newTopics }
      }
      return d
    }))
  }

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar um edital",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      let logoUrl = null
      if (logo) {
        const fileExt = logo.name.split('.').pop()
        const filePath = `${crypto.randomUUID()}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('logos')
          .upload(filePath, logo)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('logos')
          .getPublicUrl(filePath)

        logoUrl = publicUrl
      }

      // Inserir o edital
      const { data: edital, error: editalError } = await supabase
        .from('editals')
        .insert({
          user_id: user.id,
          title: editalData.title,
          organization: editalData.organization,
          year: parseInt(editalData.year),
          vagas: editalData.vagas ? parseInt(editalData.vagas) : null,
          salary: editalData.salary ? parseFloat(editalData.salary.replace('R$', '').replace('.', '').replace(',', '.')) : null,
          exam_date: editalData.examDate || null,
          logo_url: logoUrl,
        })
        .select()
        .single()

      if (editalError) throw editalError

      // Inserir as disciplinas e tópicos
      for (const discipline of disciplines) {
        const { data: disc, error: discError } = await supabase
          .from('edital_disciplines')
          .insert({
            edital_id: edital.id,
            name: discipline.name,
          })
          .select()
          .single()

        if (discError) throw discError

        // Inserir os tópicos
        for (const topicName of discipline.topics) {
          const { error: topicError } = await supabase
            .from('discipline_topics')
            .insert({
              discipline_id: disc.id,
              name: topicName,
            })

          if (topicError) throw topicError
        }
      }

      toast({
        title: "Sucesso!",
        description: "Edital criado com sucesso",
      })

      // Resetar o formulário
      setEditalData({
        title: "",
        organization: "",
        year: new Date().getFullYear().toString(),
        vagas: "",
        salary: "",
        examDate: "",
      })
      setDisciplines([])
      setLogo(null)
      setLogoPreview("")
      
      // Fechar o diálogo
      setIsOpen(false)
      
      // Invalidar as queries para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ['editals'] })

    } catch (error) {
      console.error('Erro ao salvar edital:', error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar o edital",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
        >
          <Plus className="w-4 h-4" />
          ADICIONAR EDITAL
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Edital</DialogTitle>
          <DialogDescription>
            Preencha as informações do edital e adicione as disciplinas e tópicos.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Logo Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center relative">
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Label>Logo do Órgão</Label>
          </div>

          {/* Basic Information */}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Concurso</Label>
                <Input
                  id="title"
                  value={editalData.title}
                  onChange={(e) => setEditalData({ ...editalData, title: e.target.value })}
                  placeholder="Ex: Soldado Policial Militar"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Órgão</Label>
                <Input
                  id="organization"
                  value={editalData.organization}
                  onChange={(e) => setEditalData({ ...editalData, organization: e.target.value })}
                  placeholder="Ex: PM-SC"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Ano</Label>
                <Input
                  id="year"
                  value={editalData.year}
                  onChange={(e) => setEditalData({ ...editalData, year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vagas">Vagas</Label>
                <Input
                  id="vagas"
                  type="number"
                  value={editalData.vagas}
                  onChange={(e) => setEditalData({ ...editalData, vagas: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salário</Label>
                <Input
                  id="salary"
                  value={editalData.salary}
                  onChange={(e) => setEditalData({ ...editalData, salary: e.target.value })}
                  placeholder="Ex: R$ 4.000,00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="examDate">Data da Prova</Label>
              <Input
                id="examDate"
                type="date"
                value={editalData.examDate}
                onChange={(e) => setEditalData({ ...editalData, examDate: e.target.value })}
              />
            </div>
          </div>

          {/* Disciplines and Topics */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Disciplinas e Tópicos</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addDiscipline}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Disciplina
              </Button>
            </div>

            {disciplines.map((discipline) => (
              <div key={discipline.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <Input
                      value={discipline.name}
                      onChange={(e) => {
                        setDisciplines(disciplines.map(d => 
                          d.id === discipline.id 
                            ? { ...d, name: e.target.value }
                            : d
                        ))
                      }}
                      placeholder="Nome da Disciplina"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDiscipline(discipline.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="pl-4 space-y-2">
                  {discipline.topics.map((topic, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={topic}
                        onChange={(e) => updateTopic(discipline.id, index, e.target.value)}
                        placeholder="Tópico"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTopic(discipline.id, index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTopic(discipline.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Tópico
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Salvando..." : "Salvar Edital"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}