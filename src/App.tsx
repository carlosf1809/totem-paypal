import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JornadaProvider } from "./context/JornadaContext";
import BoasVindas from "./pages/BoasVindas";
import Perfil from "./pages/Perfil";
import Desafios from "./pages/Desafios";
import Jornada from "./pages/Jornada";
import Beneficios from "./pages/Beneficios";
import Acao from "./pages/Acao";
import Fim from "./pages/Fim";
import Exportar from "./pages/Exportar";
import ChatIA from "./pages/ChatIA"; // <- aqui está certo
import ChatJuridico from "./ChatJuridico";
import './App.css'
import Solucao from "./pages/Solucao";
import LocalCliente from "./pages/LocalCliente";
import ViloesLimite from "./pages/Viloes";
import JourneyBraintree from "./pages/JourneyBraintree";
import JourneyPPCP from "./pages/JourneyPPCP";
function App() {
  return (
    <JornadaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoasVindas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/desafios" element={<Desafios />} />
          <Route path="/jornada" element={<Jornada />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/acao" element={<Acao />} />
          <Route path="/fim" element={<Fim />} />
          <Route path="/chat-ia" element={<ChatIA />} />
          <Route path="/exportar" element={<Exportar />} />
          <Route path="/chat-juridico" element={<ChatJuridico />} />
          <Route path="/local-cliente" element={<LocalCliente />} />
          <Route path="/solucao" element={<Solucao />} />
          <Route path="/viloes" element={<ViloesLimite />} />
          <Route path="/jornada-braintree" element={<JourneyBraintree />} />
          <Route path="/jornada-ppcp" element={<JourneyPPCP />} />
        </Routes>
      </BrowserRouter>
    </JornadaProvider>
  );
}

export default App;
