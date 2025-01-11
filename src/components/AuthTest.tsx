import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/ui/use-toast'

export const AuthTest = () => {
  const { toast } = useToast()

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        toast({
          title: "Conexão com Supabase estabelecida!",
          description: "A integração foi feita com sucesso.",
        })
        console.log('Supabase connection test:', session)
      } catch (error) {
        console.error('Erro ao conectar com Supabase:', error)
        toast({
          variant: "destructive",
          title: "Erro na conexão",
          description: "Houve um problema ao conectar com o Supabase.",
        })
      }
    }

    testConnection()
  }, [toast])

  return null
}