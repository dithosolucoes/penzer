import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"

const formSchema = z.object({
  subject: z.string().min(1, "A disciplina é obrigatória"),
  chapter: z.string().optional(),
  pages_read: z.coerce.number().min(0, "O número de páginas não pode ser negativo").optional(),
})

export function AddStudyDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      chapter: "",
      pages_read: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase
        .from('study_sessions')
        .insert([
          {
            user_id: user?.id,
            subject: values.subject,
            chapter: values.chapter || null,
            pages_read: values.pages_read || 0,
          }
        ])

      if (error) throw error

      toast({
        title: "Sessão de estudo iniciada!",
        description: "Boa sorte nos estudos!",
      })

      form.reset()
      setOpen(false)
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: "destructive",
        title: "Erro ao iniciar sessão de estudo",
        description: "Por favor, tente novamente.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
        >
          <Plus className="w-4 h-4 mr-2" />
          ADICIONAR ESTUDO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar Sessão de Estudo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disciplina</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Direito Constitucional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chapter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capítulo (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Direitos Fundamentais" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pages_read"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Páginas lidas (opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ex: 10" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Iniciar Estudo</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}