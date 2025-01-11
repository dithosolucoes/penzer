import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, Bold, Italic, Underline } from "lucide-react"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const formSchema = z.object({
  date: z.date(),
  subject: z.string().min(1, "Selecione uma disciplina"),
  topic: z.string().min(1, "Selecione um tópico"),
  scheduleReview: z.boolean().default(false),
  exercisesCorrect: z.number().min(0).default(0),
  exercisesWrong: z.number().min(0).default(0),
  exercisesTotal: z.number().min(0).default(0),
  pagesStart: z.number().min(0).default(0),
  pagesEnd: z.number().min(0).default(0),
  material: z.string().optional(),
  videos: z.string().optional(),
  comments: z.string().optional(),
  minutesStudied: z.number().min(0).default(0),
})

type FormValues = z.infer<typeof formSchema>

export function AddStudyDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const [isToday, setIsToday] = useState(true)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      scheduleReview: false,
      exercisesCorrect: 0,
      exercisesWrong: 0,
      exercisesTotal: 0,
      pagesStart: 0,
      pagesEnd: 0,
      minutesStudied: 0,
    },
  })

  async function onSubmit(data: FormValues) {
    if (!user) return

    try {
      const { error } = await supabase.from("study_sessions").insert({
        user_id: user.id,
        subject: data.subject,
        chapter: data.topic,
        pages_read: data.pagesEnd - data.pagesStart,
        start_time: data.date.toISOString(), // Convert Date to ISO string
      })

      if (error) throw error

      toast({
        title: "Estudo registrado com sucesso!",
        description: "Seu progresso foi salvo.",
      })

      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        title: "Erro ao registrar estudo",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          ADICIONAR ESTUDO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center font-medium">O QUE FOI ESTUDADO</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 overflow-y-auto pr-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">DATA DO ESTUDO</h3>
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant={isToday ? "secondary" : "outline"}
                    onClick={() => {
                      setIsToday(true)
                      form.setValue("date", new Date())
                    }}
                  >
                    HOJE
                  </Button>
                  <Button
                    type="button"
                    variant={!isToday ? "secondary" : "outline"}
                    onClick={() => {
                      setIsToday(false)
                      const yesterday = new Date()
                      yesterday.setDate(yesterday.getDate() - 1)
                      form.setValue("date", yesterday)
                    }}
                  >
                    ONTEM
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy", { locale: ptBR })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minutesStudied"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="MINUTOS ESTUDADOS"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="DISCIPLINA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="microbiologia">MICROBIOLOGIA MÉDICA</SelectItem>
                          <SelectItem value="anatomia">ANATOMIA</SelectItem>
                          <SelectItem value="fisiologia">FISIOLOGIA</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="TÓPICO" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="topic1">CONTEÚDO 1</SelectItem>
                          <SelectItem value="topic2">CONTEÚDO 2</SelectItem>
                          <SelectItem value="topic3">CONTEÚDO 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="scheduleReview"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <span>Programar Revisão</span>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    EXERCÍCIOS FEITOS
                    <span className="text-xs text-gray-500">(opcional)</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">ACERTOS/ERROS</div>
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name="exercisesCorrect"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="exercisesWrong"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">TOTAL</div>
                      <FormField
                        control={form.control}
                        name="exercisesTotal"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    PÁGINAS LIDAS
                    <span className="text-xs text-gray-500">(opcional)</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">DE</div>
                      <FormField
                        control={form.control}
                        name="pagesStart"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">ATÉ</div>
                      <FormField
                        control={form.control}
                        name="pagesEnd"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    MATERIAL UTILIZADO
                    <span className="text-xs text-gray-500">(opcional)</span>
                  </h3>
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Digite aqui o material utilizado..."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    VÍDEOS ASSISTIDOS
                    <span className="text-xs text-gray-500">(opcional)</span>
                  </h3>
                  <FormField
                    control={form.control}
                    name="videos"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Digite aqui o nome/link dos vídeos..."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  COMENTÁRIO SOBRE O ESTUDO
                  <span className="text-xs text-gray-500">(recomendado)</span>
                </h3>
                <div className="flex gap-2 mb-2">
                  <Button variant="outline" size="icon" type="button">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" type="button">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" type="button">
                    <Underline className="h-4 w-4" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Digite aqui um comentário sobre o estudo..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 sticky bottom-0 bg-white py-4 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                CANCELAR
              </Button>
              <Button type="submit" variant="secondary">
                CONCLUIR ESTUDO
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}