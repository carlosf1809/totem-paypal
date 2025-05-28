import { useJornada } from "../context/JornadaContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Jornada() {
  const { dados } = useJornada();
  const navigate = useNavigate();

  useEffect(() => {
    if (!dados.perfil) {
      // Redireciona imediatamente se nenhum perfil foi selecionado
      navigate("/");
      return;
    }

    // Avança automaticamente após 5 segundos
    const timer = setTimeout(() => {
      navigate("/beneficios");
    }, 5000);

    return () => clearTimeout(timer);
  }, [dados.perfil, navigate]);

  const Etapas = ({ passos }: { passos: string[] }) => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
      <h2 className="text-4xl font-bold text-white mb-12 leading-snug">
        Como o PayPal pode <br /> te ajudar
      </h2>

      <div className="space-y-6 w-full max-w-2xl">
        {passos.map((texto, index) => (
          <div
            key={index}
            className="bg-white text-lg text-black px-8 py-5 rounded-2xl shadow-xl border border-blue-100 animate-fade-in"
          >
            {texto}
          </div>
        ))}
      </div>

      <p className="mt-12 text-sm text-gray-400">Avançando automaticamente...</p>
    </div>
  );

  if (dados.perfil === "leo") {
    return (
      <Etapas
        passos={[
          "📦 Cliente abandona carrinho por falta de Pix",
          "🛒 Checkout cheio de campos → cliente desiste",
          "🔗 Loja usa Link PayPal e simplifica a cobrança",
          "📈 Vendas aumentam, Léo feliz",
        ]}
      />
    );
  }

  if (dados.perfil === "ana") {
    return (
      <Etapas
        passos={[
          "🚨 Checkout lento → perdas de conversão",
          "🔌 Integração fragmentada → dor de cabeça",
          "💳 Braintree com adquirência própria no Brasil",
          "📊 Analytics em tempo real → Ana feliz",
        ]}
      />
    );
  }

  return <div className="flex items-center justify-center h-screen">Carregando...</div>;
}


