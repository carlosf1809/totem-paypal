// src/pages/JourneyCompletePayments.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Ajuste os caminhos conforme seu projeto
import IconAcquirer from "../assets/icon-acquirer.png"; // ícone “Cresça seu negócio”
import IconGlobal from "../assets/icon-global.png";     // ícone “Aumente as taxas de conversão”
import IconFraud from "../assets/icon-fraud.png";       // ícone “Integre e habilite com facilidade”
import PhoneImage from "../assets/phone-payment.png";   // foto do smartphone (ou captura de tela)

export default function JourneyCompletePayments() {
  const navigate = useNavigate();

  // (Opcional) se quiser redirecionar automaticamente após 6 segundos:
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/beneficios");
  //   }, 6000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  // Variants para container dos itens (staggered animation)
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // tempo entre cada item
      },
    },
  };

  // Variants para cada item
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-8 space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* === Título === */}
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-[#1A1A1A]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Com o PayPal Complete Payments:
        </motion.h3>

        {/* === Lista de “superpoderes” === */}
        <motion.div
          className="flex flex-col gap-6"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Item 1 */}
          <motion.div
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-50"
            variants={listItemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={IconAcquirer}
              alt="Cresça seu negócio"
              className="w-12 h-12"
            />
            <span className="text-lg md:text-2xl text-[#1A1A1A]">
              Cresça seu negócio
            </span>
          </motion.div>

          {/* Item 2 */}
          <motion.div
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-50"
            variants={listItemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={IconGlobal}
              alt="Aumente as taxas de conversão"
              className="w-12 h-12"
            />
            <span className="text-lg md:text-2xl text-[#1A1A1A]">
              Aumente as taxas de conversão
            </span>
          </motion.div>

          {/* Item 3 */}
          <motion.div
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-50"
            variants={listItemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={IconFraud}
              alt="Integre e habilite com facilidade"
              className="w-12 h-12"
            />
            <span className="text-lg md:text-2xl text-[#1A1A1A]">
              Integre e habilite com facilidade
            </span>
          </motion.div>
        </motion.div>

        {/* === Imagem do celular / captura de tela === */}
        <motion.div
          className="overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={PhoneImage}
            alt="Exemplo de tela de pagamento no celular"
            className="w-full object-cover"
          />
        <motion.button
          onClick={() => { navigate("/beneficios"); }}
          className={`
          mt-12 px-18 py-8 rounded-sm font-medium text-2xl transition-all bg-[#0070E0] text-white hover:bg-[#0059b2] cursor-pointer`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }
          }
          transition={{
            delay: 0.8,
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Avançar
        </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
