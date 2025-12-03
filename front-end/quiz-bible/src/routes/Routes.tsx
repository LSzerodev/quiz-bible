import { Routes, Route } from "react-router-dom";
import App from "../App";
import Quiz from "../quiz/page"; 
import Perguntas from "../quiz/[id]/page";
import Relatorio from "../quiz/[id]/relatorio/page";
import { PrivateRouter } from "../components/PrivateRoutes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<PrivateRouter />}>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:id" element={<Perguntas />} />
        <Route path="/quiz/:id/relatorio" element={<Relatorio />} />
      </Route>
    </Routes>
  );
}
