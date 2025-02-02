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
import Vestibulares from "./pages/Vestibulares"
import Simulados from "./pages/Simulados"
import Redacoes from "./pages/Redacoes"
import Perfil from "./pages/Perfil"
import Admin from "./pages/Admin"
import { AuthTest } from "./components/AuthTest"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
            <Route path="/vestibulares" element={<Vestibulares />} />
            <Route path="/simulados" element={<Simulados />} />
            <Route path="/redacoes" element={<Redacoes />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App