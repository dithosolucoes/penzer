import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Index from "./pages/Index"
import Historico from "./pages/Historico"
import Revisoes from "./pages/Revisoes"
import EditalVerticalizado from "./pages/EditalVerticalizado"
import Estatisticas from "./pages/Estatisticas"
import CicloEstudos from "./pages/CicloEstudos"
import Editais from "./pages/Editais"
import { AuthTest } from "./components/AuthTest"
import { useAuth } from "@/hooks/useAuth"

const queryClient = new QueryClient()

const AppContent = () => {
  const { loading, user } = useAuth()

  // Não renderiza absolutamente nada enquanto verifica a autenticação
  if (loading) return null

  // Se não estiver carregando e não tiver usuário, renderiza apenas o Index
  // que contém a tela de login
  if (!user) {
    return <Index />
  }

  // Se tiver usuário, renderiza a aplicação completa
  return (
    <>
      <AuthTest />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/revisoes" element={<Revisoes />} />
            <Route path="/edital-verticalizado" element={<EditalVerticalizado />} />
            <Route path="/estatisticas" element={<Estatisticas />} />
            <Route path="/ciclo" element={<CicloEstudos />} />
            <Route path="/editais" element={<Editais />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
)

export default App