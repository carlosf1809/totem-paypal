// src/pages/ChatIA.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { enviarPerguntaIA } from "../services/ia";
import TecladoVirtual from "../components/TecladoVirtual";
import AvatarBot from "../assets/avatar-robo.png";
// import AvatarUser from "../assets/avatar-ana.png";

export default function ChatIA() {
  const [mensagens, setMensagens] = useState<string[]>([
    
  ]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [tecladoAberto, setTecladoAberto] = useState(false);
  const [gravando, setGravando] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "pt-BR";
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const texto = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setInput(texto);
    };
    rec.onend = () => setGravando(false);
    recognitionRef.current = rec;
  }, []);

  const toggleGravacao = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (gravando) rec.stop();
    else {
      setGravando(true);
      rec.start();
    }
  };

  const enviarMensagem = async () => {
    const texto = input.trim();
    if (!texto) return;
    setMensagens((m) => [...m, `🧑 ${texto}`]);
    setInput("");
    setCarregando(true);

    setTimeout(() =>
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })
    , 50);

    try {
      const resposta = await enviarPerguntaIA(texto);
      setMensagens((m) => [...m, `${resposta}`]);
    } catch {
      setMensagens((m) => [...m, "Ocorreu um erro ao se comunicar com a IA."]);
    } finally {
      setCarregando(false);
      setTimeout(() =>
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })
      , 50);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 px-6 pt-8 pb-4">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Converse com nosso assistente
      </h2>

      {/* Chat container reduzido um pouco */}
      <div
        ref={containerRef}
        className="flex-1 w-full max-w-3xl mx-auto overflow-y-auto px-3 py-2 bg-white rounded-2xl shadow-xl space-y-4"
      >
        {mensagens.map((msg, i) => {
          const isUser = msg.startsWith("🧑");
          const texto = msg.replace(/^🧑\s?/, "").replace(/^🤖\s?/, "");
          return (
            <div key={i} className={`flex items-end ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && (
                <img src={AvatarBot} alt="Bot" className="w-8 h-8 rounded-full mr-2" />
              )}
              <div
                className={`px-4 py-2 text-sm ${
                  isUser
                    ? "bg-blue-100 text-blue-900 rounded-md max-w-[70%]"
                    : "bg-gray-100 text-gray-800 rounded-xl max-w-[70%]"
                }`}
              >
                {texto}
              </div>
              {/* {isUser && (
                <img src={AvatarUser} alt="Você" className="w-8 h-8 rounded-full ml-2" />
              )} */}
            </div>
          );
        })}
        {carregando && (
          <div className="flex items-center space-x-2">
            <img src={AvatarBot} alt="Digitando" className="w-6 h-6 rounded-full" />
            <span className="text-gray-500 italic text-sm">Digitando...</span>
          </div>
        )}
      </div>

      {/* Input + mic + enviar */}
      <div className="w-full max-w-3xl mx-auto flex items-center gap-2 mt-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          onFocus={() => setTecladoAberto(true)}
          placeholder="Digite sua pergunta"
          className="flex-1 px-5 py-3 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition text-sm"
        />
        <button
          onClick={toggleGravacao}
          className={`p-3 rounded-full shadow-md transition ${
            gravando ? "bg-red-500" : "bg-green-500"
          }`}
          title={gravando ? "Clique para parar" : "Clique para falar"}
        >
          <MicrophoneIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={enviarMensagem}
          disabled={carregando}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md disabled:opacity-50"
        >
          Enviar
        </button>
      </div>

      {/* Teclado logo abaixo do input, em card */}
      {tecladoAberto && (
        <div className="w-full max-w-3xl mx-auto mt-4 bg-white rounded-2xl shadow-xl p-4">
          <TecladoVirtual
            onInput={(v) => setInput((prev) => prev + v)}
            onBackspace={() => setInput((prev) => prev.slice(0, -1))}
          />
        </div>
      )}

      {/* Botão "Voltar" destacado */}
      <div className="w-full max-w-3xl mx-auto text-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-6 py-2 rounded-full shadow-lg transition"
        >
          ← Voltar ao início
        </button>
      </div>
    </div>
  );
}
