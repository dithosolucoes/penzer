import { Button } from "@/components/ui/button"
import { FileText, Plus, Search, Settings, Pencil } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { EditEditalSheet } from "@/components/EditEditalSheet"
import { EditalDetailsDialog } from "@/components/EditalDetailsDialog"
import { AddEditalDialog } from "@/components/AddEditalDialog"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"

interface Edital {
  id: number;
  title: string;
  organization: string;
  year: string;
  image: string;
  vagas: number;
}

interface EditalWithType extends Edital {
  type: string;
}

const Editais = () => {
  const { user } = useAuth()
  const [editingEdital, setEditingEdital] = useState<EditalWithType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const { data: myEditais = [], isLoading: isLoadingMyEditais } = useQuery({
    queryKey: ['editals', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await supabase
        .from('editals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching editals:', error)
        return []
      }

      return data.map(edital => ({
        id: parseInt(edital.id),
        title: edital.title,
        organization: edital.organization,
        year: edital.year.toString(),
        image: edital.logo_url || "",
        vagas: edital.vagas || 0,
        type: "EDITAR EDITAL"
      }))
    },
    enabled: !!user
  })

  const filteredEditais = myEditais.filter(edital => 
    edital.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edital.organization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E8E8]/10">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">LOJA DE EDITAIS</h1>
          <AddEditalDialog />
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">MEUS EDITAIS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEditais.map((edital) => (
              <div key={edital.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-[#E8E8E8] px-6 py-4">
                  <h3 className="font-semibold text-black">{edital.title}</h3>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {edital.image ? (
                      <img 
                        src={edital.image} 
                        alt={edital.organization}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="relative">
                        <Settings className="w-8 h-8 text-gray-500" />
                        <Pencil className="w-4 h-4 text-gray-500 absolute bottom-0 right-0" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{edital.organization}</p>
                  <Button 
                    variant="secondary"
                    size="sm" 
                    className="w-full bg-[#E8E8E8] hover:bg-[#E8E8E8]/80 font-medium"
                    onClick={() => setEditingEdital(edital)}
                  >
                    {edital.type}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">SELECIONE SEU EDITAL</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input 
                placeholder="Pesquisar" 
                className="pl-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-4">TODOS EDITAIS</h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {myEditais.map((edital) => (
                <CarouselItem key={edital.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
                    <div className="flex flex-col items-center gap-4">
                      {edital.image ? (
                        <img 
                          src={edital.image} 
                          alt={edital.title}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <FileText className="w-12 h-12 text-gray-500" />
                      )}
                      <div className="text-center">
                        <h3 className="font-semibold">{edital.title}</h3>
                        <p className="text-sm text-gray-500">{edital.organization} ({edital.year})</p>
                        <p className="text-sm">Vagas: {edital.vagas}</p>
                      </div>
                      <EditalDetailsDialog edital={edital} />
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

      <EditEditalSheet 
        open={!!editingEdital}
        onOpenChange={(open) => !open && setEditingEdital(null)}
        editalTitle={editingEdital?.title || ""}
      />
    </div>
  )
}

export default Editais