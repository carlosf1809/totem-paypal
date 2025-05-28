import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import TecladoVirtual from "../components/TecladoVirtual";
import { QRCode } from "react-qrcode-logo";
import LogoPayPal from "../assets/logo-paypal.png"; // ajuste o caminho conforme seu projeto

export default function Acao() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const enviarEmail = () => {
    if (!email.includes("@")) return alert("Digite um e-mail válido.");
    atualizar({ email });
    navigate("/fim");
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative flex flex-col h-screen ">
      <div className="flex-1 overflow-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Queremos ser seu <br /> companheiro de jornada
        </h2>

        <motion.div
          className="flex flex-col gap-12 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Chat com especialista */}
          <motion.button
            className="w-full bg-blue-600 text-white text-lg font-semibold px-6 py-8 rounded-2xl shadow-md"
            onClick={() => navigate("/fim")}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            💬 Quero conversar com um especialista
          </motion.button>

          {/* E-mail */}
          <motion.div
            className="w-full flex flex-col bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm"
            variants={cardVariants}
          >
            <label className="block mb-3 font-semibold text-blue-900 text-lg">
              📧 Enviar detalhes por e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            <button
              onClick={enviarEmail}
              className="mt-4 bg-green-600 hover:bg-green-700 transition text-white font-medium px-5 py-3 rounded-lg"
            >
              Enviar
            </button>
          </motion.div>

          {/* QR Code estilizado */}
          <motion.div
            className="flex justify-center"
            variants={cardVariants}
          >
            <div
              className=" bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center"
              style={{ maxWidth: 280 }}
            >
              <QRCode
                value="https://www.paypal.com/br/home"
                size={200}
                logoImage={LogoPayPal}
                logoWidth={40}
                logoHeight={40}
                quietZone={8}
                eyeRadius={10}
                bgColor="transparent"
                fgColor="#000000"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Teclado fixo */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <TecladoVirtual
            onInput={(v) => setEmail((prev) => prev + v)}
            onBackspace={() => setEmail((prev) => prev.slice(0, -1))}
          />
        </div>
      </div>
    </div>
  );
}
