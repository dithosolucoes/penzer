import { Button } from "@/components/ui/button"

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
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Penzer</h1>
        </div>
        
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className="text-sm font-medium transition-colors hover:text-primary"
              asChild
            >
              <a href={item.href}>{item.title}</a>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <span className="sr-only">Suporte</span>
            SUPORTE
          </Button>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Perfil</span>
            PERFIL
          </Button>
        </div>
      </div>
    </div>
  )
}