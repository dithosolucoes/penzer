import { Button } from "@/components/ui/button"
import { GraduationCap, CalendarDays, BookOpen, Award, ChevronRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"

interface Vestibular {
  id: number;
  nome: string;
  instituicao: string;
  data_prova: string;
  logo_url?: string;
  vagas: number;
  nota_corte?: number;
}

const Vestibulares = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  const { data: meusVestibulares = [], isLoading } = useQuery({
    queryKey: ['vestibulares', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await supabase
        .from('vestibulares')
        .select('*')
        .eq('user_id', user.id)
        .order('data_prova', { ascending: true })

      if (error) {
        console.error('Error fetching vestibulares:', error)
        return []
      }

      return data
    },
    enabled: !!user
  })

  const vestibularesDisponiveis: Vestibular[] = [
    {
      id: 1,
      nome: "FUVEST 2024",
      instituicao: "USP",
      data_prova: "2024-01-21",
      vagas: 8211,
      nota_corte: 780
    },
    {
      id: 2,
      nome: "UNICAMP 2024",
      instituicao: "UNICAMP",
      data_prova: "2024-01-28",
      vagas: 3340,
      nota_corte: 760
    },
    {
      id: 3,
      nome: "ENEM 2024",
      instituicao: "MEC",
      data_prova: "2024-11-10",
      vagas: 0,
    }
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">ÁREA DO VESTIBULANDO</h1>
          <Button variant="secondary" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            ADICIONAR VESTIBULAR
          </Button>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">MEUS VESTIBULARES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meusVestibulares.map((vestibular) => (
              <div key={vestibular.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-[#E8E8E8] px-6 py-4">
                  <h3 className="font-semibold text-black">{vestibular.nome}</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Data da Prova:</span>
                    </div>
                    <span className="text-sm font-medium">
                      {new Date(vestibular.data_prova).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Vagas:</span>
                    </div>
                    <span className="text-sm font-medium">{vestibular.vagas}</span>
                  </div>

                  {vestibular.nota_corte && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Nota de Corte:</span>
                      </div>
                      <span className="text-sm font-medium">{vestibular.nota_corte}</span>
                    </div>
                  )}

                  <Button 
                    variant="secondary"
                    className="w-full mt-4 bg-[#E8E8E8] hover:bg-[#E8E8E8]/80"
                  >
                    VER DETALHES
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">PRÓXIMOS VESTIBULARES</h2>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {vestibularesDisponiveis.map((vestibular) => (
                <CarouselItem key={vestibular.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{vestibular.nome}</h3>
                          <p className="text-sm text-gray-500">{vestibular.instituicao}</p>
                        </div>
                        <GraduationCap className="h-6 w-6 text-gray-400" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Data da Prova:</span>
                          <span>{new Date(vestibular.data_prova).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Vagas:</span>
                          <span>{vestibular.vagas || "A definir"}</span>
                        </div>
                        {vestibular.nota_corte && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Nota de Corte:</span>
                            <span>{vestibular.nota_corte}</span>
                          </div>
                        )}
                      </div>

                      <Button variant="secondary" className="w-full gap-2">
                        SAIBA MAIS
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Vestibulares