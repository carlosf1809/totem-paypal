// src/pages/ChatJuridico.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { enviarPerguntaIA } from "./service";
import AvatarBot from "../assets/avatar-robo.png";
import AvatarUser from "../assets/avatar-ana.png";

export default function ChatJuridico() {
  const [mensagens, setMensagens] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [gravando, setGravando] = useState(false);

  // Estados para Sim/Não
  const [awaitingSimOuNao, setAwaitingSimOuNao] = useState(false);
  const [lastProcessNumber, setLastProcessNumber] = useState("");

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Configurar SpeechRecognition
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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

  // Rola o chat para o fim
  const scrollToBottom = () => {
    setTimeout(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  // Envia mensagem para a IA
  const enviarMensagem = async () => {
    const texto = input.trim();
    if (!texto || awaitingSimOuNao) return;

    setMensagens((m) => [...m, `🧑 ${texto}`]);
    setLastProcessNumber(texto);
    setInput("");
    setCarregando(true);
    scrollToBottom();

    try {
      const resposta = await enviarPerguntaIA(texto);
      if (resposta.includes("~SimOuNao~")) {
        setMensagens((m) => [
          ...m,
          resposta.replace("~SimOuNao~", "").trim(),
        ]);
        setAwaitingSimOuNao(true);
      } else {
        setMensagens((m) => [...m, resposta]);
      }
    } catch {
      setMensagens((m) => [...m, "Ocorreu um erro ao se comunicar com a IA."]);
    } finally {
      setCarregando(false);
      scrollToBottom();
    }
  };

  // Tratamento dos botões Sim/Não
  const handleSimNao = async (sim: boolean) => {
    setMensagens((m) => [...m, `🧑 ${sim ? "Sim" : "Não"}`]);
    setAwaitingSimOuNao(false);
    setCarregando(true);
    scrollToBottom();

    if (sim) {
      const action = `EnviarDocumentos::${lastProcessNumber}`;
      try {
        const resposta = await enviarPerguntaIA(action);
        setMensagens((m) => [...m, resposta]);
      } catch {
        setMensagens((m) => [...m, "Erro ao enviar documentos."]);
      }
    } else {
      setMensagens((m) => [
        ...m,
        "Tudo bem. Posso ajudar em mais algo?",
      ]);
    }

    setCarregando(false);
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 px-6 pt-8 pb-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Converse com nosso assistente
      </h2>

      {/* Área do chat */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 w-full max-w-3xl overflow-y-auto px-4 py-2 bg-gray-800 rounded-2xl shadow-xl space-y-4 mx-auto"
      >
        {mensagens.map((msg, i) => {
          const isUser = msg.startsWith("🧑");
          const texto = msg.replace(/^🧑\s?/, "");
          return (
            <div
              key={i}
              className={`flex items-end ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <img
                  src={AvatarBot}
                  alt="Bot"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
              )}
              <div
                className={`px-4 py-2 text-sm ${
                  isUser
                    ? "bg-blue-700 text-white rounded-md shadow-sm max-w-[70%]"
                    : "bg-gray-700 text-gray-200 rounded-xl max-w-[70%]"
                }`}
              >
                {texto}
              </div>
              {isUser && (
                <img
                  src={AvatarUser}
                  alt="Você"
                  className="w-8 h-8 rounded-full object-cover ml-2"
                />
              )}
            </div>
          );
        })}

        {carregando && (
          <div className="flex items-center space-x-2">
            <img
              src={AvatarBot}
              alt="Bot digitando"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-gray-400 italic text-sm">Digitando...</span>
          </div>
        )}

        {/* Botões Sim/Não */}
        {awaitingSimOuNao && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => handleSimNao(true)}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full shadow-md"
            >
              Sim
            </button>
            <button
              onClick={() => handleSimNao(false)}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full shadow-md"
            >
              Não
            </button>
          </div>
        )}
      </div>

      {/* Input + mic + enviar */}
      <div className="w-full max-w-3xl flex gap-2 mt-4 items-center mx-auto">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          placeholder="Digite sua pergunta"
          className="flex-1 px-5 py-3 rounded-full bg-gray-700 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
          disabled={awaitingSimOuNao || carregando}
        />
        <button
          onClick={toggleGravacao}
          className={`p-3 rounded-full shadow-md transition ${
            gravando ? "bg-red-600" : "bg-green-600"
          }`}
          title={gravando ? "Clique para parar" : "Clique para falar"}
        >
          <MicrophoneIcon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={enviarMensagem}
          disabled={awaitingSimOuNao || carregando}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
  