import React from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import { HelpCircle, User, Home, BookOpen, FileText, BarChart2, Book, Calendar } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const menuItems = [
  {
    title: "MEU DIA",
    href: "/universitario",
    icon: Home,
    description: "Visualize suas atividades do dia"
  },
  {
    title: "DISCIPLINAS",
    href: "/universitario/disciplinas",
    icon: Book,
    description: "Gerencie suas disciplinas do semestre"
  },
  {
    title: "TRABALHOS",
    href: "/universitario/trabalhos",
    icon: FileText,
    description: "Organize seus trabalhos e projetos"
  },
  {
    title: "CALENDÁRIO",
    href: "/universitario/calendario",
    icon: Calendar,
    description: "Acompanhe o calendário acadêmico"
  },
  {
    title: "NOTAS",
    href: "/universitario/notas",
    icon: BarChart2,
    description: "Acompanhe suas notas"
  },
]

export function UniversitarioNavigation() {
  const { signOut } = useAuth()

  return (
    <div className="w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link 
                  to={item.href}
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:text-[#F2CED0]"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Suporte</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:text-[#F2CED0]"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Perfil</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/universitario/perfil" className="w-full cursor-pointer">
                  Minha Conta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => signOut()}
                className="cursor-pointer"
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}