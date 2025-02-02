import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
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

          {/* Rotas protegidas com MainLayout */}
          <Route path="/" element={<MainLayout><Index /></MainLayout>} />
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