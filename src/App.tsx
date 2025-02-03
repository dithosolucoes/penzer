import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { AuthTest } from "@/components/AuthTest"
import MainLayout from "./components/layout/MainLayout"
import VestibularLayout from "./components/layout/VestibularLayout"
import UniversitarioLayout from "./components/layout/UniversitarioLayout"
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

// Import Vestibular pages
import VestibularHome from "./pages/vestibular/VestibularHome"
import VestibularMaterias from "./pages/vestibular/VestibularMaterias"
import VestibularSimulados from "./pages/vestibular/VestibularSimulados"
import VestibularCronograma from "./pages/vestibular/VestibularCronograma"
import VestibularRevisoes from "./pages/vestibular/VestibularRevisoes"
import VestibularEstatisticas from "./pages/vestibular/VestibularEstatisticas"
import VestibularRedacao from "./pages/vestibular/VestibularRedacao"
import VestibularPerfil from "./pages/vestibular/VestibularPerfil"

// Import Universitario pages
import UniversitarioHome from "./pages/universitario/UniversitarioHome"
import UniversitarioDisciplinas from "./pages/universitario/UniversitarioDisciplinas"
import UniversitarioTrabalhos from "./pages/universitario/UniversitarioTrabalhos"
import UniversitarioCronograma from "./pages/universitario/UniversitarioCronograma"
import UniversitarioEstatisticas from "./pages/universitario/UniversitarioEstatisticas"
import UniversitarioNotas from "./pages/universitario/UniversitarioNotas"
import UniversitarioPerfil from "./pages/universitario/UniversitarioPerfil"
import UniversitarioCiclo from "./pages/universitario/UniversitarioCiclo"

const queryClient = new QueryClient()

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

          {/* Rotas do universitário */}
          <Route path="/universitario/*" element={
            <UniversitarioLayout>
              <Routes>
                <Route path="/" element={<UniversitarioHome />} />
                <Route path="/disciplinas" element={<UniversitarioDisciplinas />} />
                <Route path="/trabalhos" element={<UniversitarioTrabalhos />} />
                <Route path="/cronograma" element={<UniversitarioCronograma />} />
                <Route path="/notas" element={<UniversitarioNotas />} />
                <Route path="/estatisticas" element={<UniversitarioEstatisticas />} />
                <Route path="/perfil" element={<UniversitarioPerfil />} />
                <Route path="/ciclo" element={<UniversitarioCiclo />} />
              </Routes>
            </UniversitarioLayout>
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
