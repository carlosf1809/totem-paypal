// src/pages/JourneyPPCP.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Substitua pelos assets reais
// import imgSemPP from "../assets/ppcp-without.png";
// import imgComPP from "../assets/ppcp-with.png";

export default function JourneyPPCP() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/beneficios");
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 space-y-12">
      {/* Card: Sem o PayPal */}
      <motion.div
        className="w-full max-w-3xl bg-white rounded-3xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Sem o PayPal</h3>
        <p className="text-lg text-[#1A1A1A] mb-4">
          Checkout cheio de campos → <span className="text-[#0070E0]">cliente desiste</span>
        </p>
        <div className="overflow-hidden rounded-lg">
          {/* <img
            src={imgSemPP}
            alt="Checkout cheio de campos"
            className="w-full object-cover"
          /> */}
        </div>
      </motion.div>

      {/* Card: Com o PayPal PPCP */}
      <motion.div
        className="w-full max-w-3xl bg-white rounded-3xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Com o PayPal PPCP</h3>
        <p className="text-lg text-[#1A1A1A] mb-4">
          Loja usa Link PayPal e simplifica a cobrança
        </p>
        <div className="overflow-hidden rounded-lg mb-4">
          {/* <img
            src={imgComPP}
            alt="Link PayPal simplificado"
            className="w-full object-cover"
          /> */}
        </div>
        <ul className="list-disc list-inside text-[#1A1A1A] space-y-2">
          <li>Vendas aumentam</li>
        </ul>
      </motion.div>
    </div>
  );
}
