import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { MainLayout } from "@/components/layout/MainLayout"
import Index from "@/pages/Index"
import Historico from "@/pages/Historico"
import Revisoes from "@/pages/Revisoes"
import EditalVerticalizado from "@/pages/EditalVerticalizado"
import Estatisticas from "@/pages/Estatisticas"
import CicloEstudos from "@/pages/CicloEstudos"
import Editais from "@/pages/Editais"
import MinhaContaPage from "@/pages/MinhaContaPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="historico" element={<Historico />} />
          <Route path="revisoes" element={<Revisoes />} />
          <Route path="edital-verticalizado" element={<EditalVerticalizado />} />
          <Route path="estatisticas" element={<Estatisticas />} />
          <Route path="ciclo" element={<CicloEstudos />} />
          <Route path="editais" element={<Editais />} />
          <Route path="minha-conta" element={<MinhaContaPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App