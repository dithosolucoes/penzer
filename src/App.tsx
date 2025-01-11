import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "@/components/layout/MainLayout"
import Index from "@/pages/Index"
import Editais from "@/pages/Editais"
import EditalVerticalizado from "@/pages/EditalVerticalizado"
import CicloEstudos from "@/pages/CicloEstudos"
import Revisoes from "@/pages/Revisoes"
import Historico from "@/pages/Historico"
import Estatisticas from "@/pages/Estatisticas"
import Landing from "@/pages/Landing"
import { AuthUI } from "@/components/auth/AuthUI"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route 
          path="/auth" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="w-full max-w-md p-6 space-y-8">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <h1 className="text-2xl font-bold">Bem-vindo ao Sistema de Estudos</h1>
                  <p className="text-muted-foreground text-center">
                    Faça login ou registre-se para acessar sua área de estudos
                  </p>
                </div>
                <AuthUI />
              </div>
            </div>
          } 
        />

        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Index />} />
          <Route path="/editais" element={<Editais />} />
          <Route path="/edital-verticalizado" element={<EditalVerticalizado />} />
          <Route path="/ciclo-estudos" element={<CicloEstudos />} />
          <Route path="/revisoes" element={<Revisoes />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App