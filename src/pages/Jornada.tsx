import { useJornada } from "../context/JornadaContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Jornada() {
  const { dados } = useJornada();
  const navigate = useNavigate();

  useEffect(() => {
    // redireciona para próxima etapa após X segundos (simulando animação)
    const timer = setTimeout(() => {
      navigate("/beneficios");
    }, 5000); // 5s para simular autoplay

    return () => clearTimeout(timer);
  }, [navigate]);

  if (dados.perfil === "leo") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Como o PayPal pode te ajudar</h2>
        <div className="space-y-4">
          <p>📦 Cliente abandona carrinho por falta de Pix</p>
          <p>🛒 Checkout cheio de campos → cliente desiste</p>
          <p>🔗 Loja usa Link PayPal e simplifica a cobrança</p>
          <p>📈 Vendas aumentam, Léo feliz</p>
        </div>
      </div>
    );
  }

  if (dados.perfil === "ana") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Como o PayPal pode te ajudar</h2>
        <div className="space-y-4">
          <p>🚨 Checkout lento → perdas de conversão</p>
          <p>🔌 Integração fragmentada → dor de cabeça</p>
          <p>💳 Braintree com adquirência própria no Brasil</p>
          <p>📊 Analytics em tempo real → Ana feliz</p>
        </div>
      </div>
    );
  }

  return <div className="flex items-center justify-center h-screen">Carregando...</div>;
}
