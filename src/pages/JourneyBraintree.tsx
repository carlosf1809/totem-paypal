// src/pages/JourneyBraintree.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// import imgWithout from "../assets/braintree-without.png";
// import imgWith from "../assets/braintree-with.png";

export default function JourneyBraintree() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/beneficios");
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 space-y-12">
      {/* Card: Sem o Braintree */}
      <motion.div
        className="w-full max-w-3xl bg-white rounded-3xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Sem o Braintree</h3>
        <ul className="list-disc list-inside space-y-2 text-[#1A1A1A] mb-6">
          <li>Plataforma grande com checkout lento, perdas de conversão.</li>
          <li>Integração fragmentada.</li>
        </ul>
        <div className="overflow-hidden rounded-lg">
          {/* <img src={imgWithout} alt="Checkout lento e fragmentado" className="w-full object-cover" /> */}
        </div>
      </motion.div>

      {/* Card: Com o Braintree */}
      <motion.div
        className="w-full max-w-3xl bg-white rounded-3xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Com o Braintree</h3>
        <ul className="list-disc list-inside space-y-2 text-[#1A1A1A] mb-6">
          <li>
            Braintree agora integrado com adquirência própria no Brasil, aceitando vários meios de
            pagamento sem depender de intermediários.
          </li>
          <li>Venda fluindo, analytics em tempo real, ganho de escala.</li>
        </ul>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 overflow-hidden rounded-lg">
            {/* <img src={imgWith} alt="Braintree integrado" className="w-full object-cover" /> */}
          </div>
          {/* Se tiver outra imagem complementar, duplique a estrutura acima */}
        </div>
      </motion.div>
    </div>
  );
}
