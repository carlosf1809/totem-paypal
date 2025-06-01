// src/pages/JourneyBraintree.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { motion } from "framer-motion";
import IconAcquirer from "../assets/icon-acquirer.png"; // ícone "Adquirência própria"
import IconGlobal from "../assets/icon-global.png";   // ícone "Única integração, alcance global"
import IconFraud from "../assets/icon-fraud.png";     // ícone "Proteção contra fraudes avançadas"
import BraintreeCheckout1 from "../assets/braintree-checkout-1.png";
import BraintreeCheckout2 from "../assets/braintree-checkout-2.png";


export default function JourneyBraintree() {
  const navigate = useNavigate();

  // Se quiser redirecionar automaticamente após alguns segundos, descomente:
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/beneficios");
  //   }, 6000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  // Variants para container de lista (staggered children)
  const listContainer = {
    hidden: { opacity: 1 }, // manter opacidade 1 para não esconder o container
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // cada filho aparece 0.25s após o anterior
      },
    },
  };

  // Variants para cada item da lista
  const listItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-3xl bg-white rounded-3xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        {/* ===== TÍTULO ===== */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        >
          Com o PayPal Braintree:
        </motion.h2>

        {/* ===== LISTA DE BENEFÍCIOS ===== */}
        <motion.ul
          className="space-y-4 mb-8"
          variants={listContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.li
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-50"
            variants={listItem}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={IconAcquirer}
              alt="Ícone Adquirência própria"
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <span className="text-lg md:text-xl text-[#1A1A1A]">
              Adquirência própria
            </span>
          </motion.li>

          <motion.li
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-50"
            variants={listItem}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={IconGlobal}
              alt="Ícone Única integração, alcance global"
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <span className="text-lg md:text-xl text-[#1A1A1A]">
              Única integração, alcance global
            </span>
          </motion.li>

          <motion.li
            className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-50"
            variants={listItem}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={IconFraud}
              alt="Ícone Proteção contra fraudes avançadas"
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <span className="text-lg md:text-xl text-[#1A1A1A]">
              Proteção contra fraudes avançadas*
            </span>
          </motion.li>
        </motion.ul>

        {/* ===== IMAGENS DE CHECKOUT ===== */}
        <div className="flex gap-4 justify-center items-center">
          <motion.div
            className="w-1/2 overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={BraintreeCheckout1}
              alt="Checkout Braintree 1"
              className="w-full object-cover"
            />
          </motion.div>

          <motion.div
            className="w-1/2 overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={BraintreeCheckout2}
              alt="Checkout Braintree 2"
              className="w-full object-cover"
            />
          </motion.div>
        </div>
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

        {/* Footnote */}
        <motion.p
          className="text-xs text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          * sob aprovação
        </motion.p>
      </motion.div>
    </div>
  );
}
