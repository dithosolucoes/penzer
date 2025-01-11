import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/Logo"
import { Brain, FileText, Timer, ChartBar, RefreshCw, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Landing = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-[#F2CED0]" />,
      title: "Edital Verticalizado",
      description: "Visualize seu progresso diretamente no edital e saiba exatamente onde focar seus estudos."
    },
    {
      icon: <Timer className="w-8 h-8 text-[#F2CED0]" />,
      title: "Ciclo de Estudos",
      description: "Organize seu tempo de forma inteligente com ciclos de estudo personalizados."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-[#F2CED0]" />,
      title: "Revisão Espaçada",
      description: "Sistema inteligente de revisões para fixação do conteúdo."
    },
    {
      icon: <ChartBar className="w-8 h-8 text-[#F2CED0]" />,
      title: "Estatísticas Detalhadas",
      description: "Acompanhe sua evolução com gráficos e métricas precisas."
    }
  ]

  const testimonials = [
    {
      text: "O sistema me ajudou muito a organizar meus estudos. Agora consigo ter uma visão clara do meu progresso!",
      author: "Maria S."
    },
    {
      text: "A função de revisão espaçada é fantástica! Melhorou muito minha retenção de conteúdo.",
      author: "João P."
    },
    {
      text: "Interface intuitiva e fácil de usar. Recomendo para todos os concurseiros!",
      author: "Ana C."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <div className="space-x-4">
            <Button 
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              Login
            </Button>
            <Button 
              className="bg-[#F2CED0] hover:bg-[#F2CED0]/90 text-black"
              onClick={() => navigate("/dashboard")}
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[#F2CED0]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Registre seus estudos, acompanhe avanços e programe revisões
              </h1>
              <p className="text-xl text-gray-600">
                A cada acesso, uma visão clara do seu progresso. Mantenha seu estudo organizado, cronometrado e registrado em uma plataforma moderna feita especialmente para você.
              </p>
              <div className="pt-4">
                <Button 
                  size="lg"
                  className="bg-[#F2CED0] hover:bg-[#F2CED0]/90 text-black"
                  onClick={() => navigate("/dashboard")}
                >
                  Comece Gratuitamente
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/lovable-uploads/ef499c5a-0f41-490d-bd84-a5ca467887c9.png" 
                alt="Dashboard Preview" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher a Penzer?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg border hover:border-[#F2CED0] transition-colors">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Conheça nossa plataforma
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {[
                "/lovable-uploads/841c94c6-0a85-442b-bf9f-9d418b5ac03d.png",
                "/lovable-uploads/7e32dba4-b6d7-406b-81f4-16497c22056d.png",
                "/lovable-uploads/cf44070b-a9f5-4794-8839-6c421654935b.png"
              ].map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                  <div className="p-1">
                    <img 
                      src={image} 
                      alt={`Screenshot ${index + 1}`}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que nossos usuários dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg border">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Planos e Preços
          </h2>
          <div className="max-w-sm mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <h3 className="text-2xl font-bold text-center mb-4">1 ANO DE ACESSO</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>12 meses de acesso</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Acesso imediato</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Renovação automática</span>
                </li>
              </ul>
              <div className="text-center mb-6">
                <p className="text-gray-500 line-through">R$ 290,00</p>
                <div className="text-3xl font-bold">R$ 189,00</div>
                <p className="text-sm text-gray-500">ou 12x de R$ 18,86</p>
              </div>
              <Button 
                className="w-full bg-[#F2CED0] hover:bg-[#F2CED0]/90 text-black"
                size="lg"
                onClick={() => navigate("/dashboard")}
              >
                QUERO ASSINAR
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo />
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400">© 2024 Penzer. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing