import { Button } from "@/components/ui/button"
import { AddStudyDialog } from "@/components/AddStudyDialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { format } from "date-fns"
import { useState } from "react"

const Historico = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  const { data: studySessions = [], isLoading } = useQuery({
    queryKey: ['study-sessions', user?.id],
    queryFn: async () => {
      if (!user) return []

      const { data, error } = await supabase
        .from('study_sessions')
        .select(`
          *,
          reviews(*)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching study sessions:', error)
        throw error
      }

      return data || []
    },
    enabled: !!user
  })

  const filteredSessions = studySessions.filter(session => 
    session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (session.chapter && session.chapter.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatDuration = (startTime: string, endTime: string | null) => {
    if (!endTime) return "Em andamento"
    const start = new Date(startTime)
    const end = new Date(endTime)
    const diffInMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60))
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    return `${hours}h ${minutes}min`
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">HISTÓRICO</h1>
          <AddStudyDialog>
            <Button 
              variant="secondary" 
              size="sm"
              className="font-medium"
            >
              ADICIONAR ESTUDO
            </Button>
          </AddStudyDialog>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por disciplina, assunto..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DATA</TableHead>
                <TableHead>EDITAL</TableHead>
                <TableHead>DISCIPLINA/CAPÍTULO</TableHead>
                <TableHead>ASSUNTOS</TableHead>
                <TableHead>PÁGINAS LIDAS</TableHead>
                <TableHead>TEMPO DE ESTUDO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredSessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Nenhum estudo encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>{format(new Date(session.created_at), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>ENEM 2024</TableCell>
                    <TableCell>
                      {session.subject}
                      {session.chapter && `/${session.chapter}`}
                    </TableCell>
                    <TableCell>
                      {session.reviews?.map(review => review.subject).join(', ') || '-'}
                    </TableCell>
                    <TableCell>{session.pages_read || 0}</TableCell>
                    <TableCell>{formatDuration(session.start_time, session.end_time)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Historico