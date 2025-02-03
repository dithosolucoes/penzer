import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface FormValues {
  nome: string
  professor: string
  horario: string
}

const AddDisciplinaDialog = () => {
  const form = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    // Aqui você implementaria a lógica para salvar no banco de dados
    console.log(data)
    toast.success("Disciplina adicionada com sucesso!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Disciplina
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Disciplina</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Disciplina</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cálculo I" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="professor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do professor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="horario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Segunda e Quarta, 19h-20:30h" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Adicionar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDisciplinaDialog