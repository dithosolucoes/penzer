import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Editais from "./pages/Editais";
import EditalVerticalizado from "./pages/EditalVerticalizado";
import CicloEstudos from "./pages/CicloEstudos";
import Historico from "./pages/Historico";
import Revisoes from "./pages/Revisoes";
import Estatisticas from "./pages/Estatisticas";
import Perfil from "./pages/Perfil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/editais",
    element: <Editais />,
  },
  {
    path: "/edital-verticalizado",
    element: <EditalVerticalizado />,
  },
  {
    path: "/ciclo-estudos",
    element: <CicloEstudos />,
  },
  {
    path: "/historico",
    element: <Historico />,
  },
  {
    path: "/revisoes",
    element: <Revisoes />,
  },
  {
    path: "/estatisticas",
    element: <Estatisticas />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
]);

export default router;
