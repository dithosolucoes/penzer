import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import MainLayout from "./components/layout/MainLayout"
import VestibularLayout from "./components/layout/VestibularLayout"
import Index from "./pages/Index"
import Login from "./pages/Login"
import Historico from "./pages/Historico"
import Revisoes from "./pages/Revisoes"
import EditalVerticalizado from "./pages/EditalVerticalizado"
import Estatisticas from "./pages/Estatisticas"
import CicloEstudos from "./pages/CicloEstudos"
import Editais from "./pages/Editais"
import Perfil from "./pages/Perfil"
import Admin from "./pages/Admin"
import { AuthTest } from "./components/AuthTest"

const queryClient = new QueryClient()

// Componente para redirecionar baseado no tipo de perfil
const ProfileRouter = () => {
  const { user } = useAuth()
  
  if (!user) return <Navigate to="/login" replace />
  
  switch (user.user_metadata.profile_type) {
    case "vestibulando":
      return <Navigate to="/vestibular" replace />
    case "universitario":
      return <Navigate to="/universitario" replace />
    case "concurseiro":
    default:
      return <MainLayout><Index /></MainLayout>
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthTest />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rota inicial com redirecionamento baseado no perfil */}
          <Route path="/" element={<ProfileRouter />} />

          {/* Rotas do vestibulando */}
          <Route path="/vestibular/*" element={
            <VestibularLayout>
              <Routes>
                <Route path="/" element={<VestibularHome />} />
                <Route path="/materias" element={<VestibularMaterias />} />
                <Route path="/simulados" element={<VestibularSimulados />} />
                <Route path="/cronograma" element={<VestibularCronograma />} />
                <Route path="/revisoes" element={<VestibularRevisoes />} />
                <Route path="/estatisticas" element={<VestibularEstatisticas />} />
                <Route path="/redacao" element={<VestibularRedacao />} />
                <Route path="/perfil" element={<VestibularPerfil />} />
              </Routes>
            </VestibularLayout>
          } />

          {/* Rotas do concurseiro */}
          <Route path="/historico" element={<MainLayout><Historico /></MainLayout>} />
          <Route path="/revisoes" element={<MainLayout><Revisoes /></MainLayout>} />
          <Route path="/edital-verticalizado" element={<MainLayout><EditalVerticalizado /></MainLayout>} />
          <Route path="/estatisticas" element={<MainLayout><Estatisticas /></MainLayout>} />
          <Route path="/ciclo" element={<MainLayout><CicloEstudos /></MainLayout>} />
          <Route path="/editais" element={<MainLayout><Editais /></MainLayout>} />
          <Route path="/perfil" element={<MainLayout><Perfil /></MainLayout>} />
          <Route path="/admin" element={<MainLayout><Admin /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App