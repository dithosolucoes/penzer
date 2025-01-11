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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
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