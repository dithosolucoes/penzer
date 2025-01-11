import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import { HelpCircle, User, Home, History, BookOpen, FileText, BarChart2, Book } from "lucide-react"

const menuItems = [
  {
    title: "MEU DIA",
    href: "/",
    icon: Home
  },
  {
    title: "HISTÓRICO",
    href: "/historico",
    icon: History
  },
  {
    title: "REVISÕES",
    href: "/revisoes",
    icon: BookOpen
  },
  {
    title: "EDITAL VERTICALIZADO",
    href: "/edital-verticalizado",
    icon: FileText
  },
  {
    title: "ESTATÍSTICAS",
    href: "/estatisticas",
    icon: BarChart2
  },
  {
    title: "CICLO DE ESTUDOS",
    href: "/ciclo",
    icon: Book
  },
  {
    title: "EDITAIS",
    href: "/editais",
    icon: FileText
  },
]

export function TopNavigation() {
  return (
    <div className="w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        <nav className="mx-6 hidden items-center space-x-4 lg:flex lg:space-x-6">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className="text-sm font-medium transition-colors hover:text-[#F2CED0] flex items-center gap-2"
              asChild
            >
              <a href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </a>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:text-[#F2CED0]"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Suporte</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:text-[#F2CED0]"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  )
}