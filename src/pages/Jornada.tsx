import { useJornada } from "../context/JornadaContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TextoAnimado from "../components/TextoAnimado";

export default function Jornada() {
  const { dados } = useJornada();
  const navigate = useNavigate();

  useEffect(() => {
    if (!dados.perfil) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      navigate("/beneficios");
    }, 5000);

    return () => clearTimeout(timer);
  }, [dados.perfil, navigate]);

  const Etapas = ({ passos }: { passos: string[] }) => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center bg-[#001E5A] text-white">
      {/* TÍTULO animado */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#91caff] mb-12">
        <TextoAnimado texto="Como o PayPal pode te ajudar" delayBase={0} />
      </h2>

      {/* LISTA animada */}
      <div className="space-y-6 w-full max-w-2xl">
        {passos.map((texto, index) => (
          <motion.div
            key={index}
            className="bg-white text-[#003087] text-lg px-8 py-5 rounded-2xl shadow-xl border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.3 }}
          >
            {texto}
          </motion.div>
        ))}
      </div>

      <p className="mt-12 text-sm text-gray-300 italic">Avançando automaticamente...</p>
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
