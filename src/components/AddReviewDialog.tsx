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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"

type FormData = {
  subject: string
  content: string
  reviewDate: string
}

export function AddReviewDialog() {
  const form = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    // TODO: Implement review creation
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          size="sm"
          className="gap-2 bg-[#F2CED0] hover:bg-[#F2CED0]/90"
        >
          <Plus className="h-4 w-4" />
          Adicionar Revisão
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Revisão</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matéria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a matéria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="matematica">Matemática</SelectItem>
                      <SelectItem value="portugues">Português</SelectItem>
                      <SelectItem value="fisica">Física</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o conteúdo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reviewDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da Revisão</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}