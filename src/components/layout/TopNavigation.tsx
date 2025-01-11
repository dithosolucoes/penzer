import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import { HelpCircle, User } from "lucide-react"

const menuItems = [
  {
    title: "MEU DIA",
    href: "/",
  },
  {
    title: "HISTÓRICO",
    href: "/historico",
  },
  {
    title: "REVISÕES",
    href: "/revisoes",
  },
  {
    title: "CICLO DE ESTUDOS",
    href: "/ciclo",
  },
  {
    title: "EDITAIS",
    href: "/editais",
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
              className="text-sm font-medium transition-colors hover:text-[#F2CED0]"
              asChild
            >
              <a href={item.href}>{item.title}</a>
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