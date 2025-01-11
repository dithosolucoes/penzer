import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import { HelpCircle, User, Home, History, BookOpen, FileText, BarChart2, Book } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

const menuItems = [
  {
    title: "MEU DIA",
    href: "/",
    icon: Home,
    description: "Visualize e gerencie suas tarefas do dia"
  },
  {
    title: "HISTÓRICO",
    href: "/historico",
    icon: History,
    description: "Acompanhe seu histórico de estudos"
  },
  {
    title: "REVISÕES",
    href: "/revisoes",
    icon: BookOpen,
    description: "Gerencie suas revisões programadas"
  },
  {
    title: "EDITAL VERTICALIZADO",
    href: "/edital-verticalizado",
    icon: FileText,
    description: "Visualize o edital de forma organizada"
  },
  {
    title: "ESTATÍSTICAS",
    href: "/estatisticas",
    icon: BarChart2,
    description: "Acompanhe suas métricas de estudo"
  },
  {
    title: "CICLO DE ESTUDOS",
    href: "/ciclo",
    icon: Book,
    description: "Organize seu ciclo de estudos"
  },
  {
    title: "EDITAIS",
    href: "/editais",
    icon: FileText,
    description: "Acesse os editais disponíveis"
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function TopNavigation() {
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