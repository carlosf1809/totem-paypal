// src/pages/Acao.tsx
import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TecladoVirtual from "../components/TecladoVirtual";
// Importamos o QRCode do pacote react-qrcode-logo
import { QRCode } from "react-qrcode-logo";

// For file system operations (works in Electron or Node.js environment)
const fs = window.require?.('fs') || require('fs');
const path = window.require?.('path') || require('path');

interface ContactData {
  fullName: string;
  email: string;
  phone: string;
  timestamp: string;
}

export default function Acao() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // UI states
  const [showForm, setShowForm] = useState(false);
  const [currentField, setCurrentField] = useState<'fullName' | 'email' | 'phone'>('fullName');
  const [showQRModal, setShowQRModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File path for local storage
  const dataFilePath = path.join(process.cwd(), 'totem-contacts.json');

  // Load existing data on component mount
  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = () => {
    try {
      if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const contacts = JSON.parse(data);
        console.log(`Loaded ${contacts.length} existing contacts from file`);
      } else {
        // Create empty file if it doesn't exist
        fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf8');
        console.log('Created new contacts file');
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
      // Create empty file if there's an error
      fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf8');
    }
  };

  const saveContactData = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Read existing data
      let existingContacts: ContactData[] = [];
      if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        existingContacts = JSON.parse(data);
      }

      // Create new contact entry
      const newContact: ContactData = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        timestamp: new Date().toISOString()
      };

      // Append to existing data
      existingContacts.push(newContact);

      // Write back to file
      fs.writeFileSync(dataFilePath, JSON.stringify(existingContacts, null, 2), 'utf8');
      
      console.log('Contact saved successfully:', newContact);
      
      // Update context
      atualizar({ email: email.trim(), fullName: fullName.trim(), phone: phone.trim() });
      
      // Navigate to success page
      navigate("/fim");
      
    } catch (error) {
      console.error('Error saving contact data:', error);
      alert('Erro ao salvar dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVirtualKeyboardInput = (value: string) => {
    switch (currentField) {
      case 'fullName':
        setFullName(prev => prev + value);
        break;
      case 'email':
        setEmail(prev => prev + value);
        break;
      case 'phone':
        setPhone(prev => prev + value);
        break;
    }
  };

  const handleBackspace = () => {
    switch (currentField) {
      case 'fullName':
        setFullName(prev => prev.slice(0, -1));
        break;
      case 'email':
        setEmail(prev => prev.slice(0, -1));
        break;
      case 'phone':
        setPhone(prev => prev.slice(0, -1));
        break;
    }
  };

  const moveToNextField = () => {
    if (currentField === 'fullName') {
      setCurrentField('email');
    } else if (currentField === 'email') {
      setCurrentField('phone');
    } else {
      // Submit when on last field and pressing next
      saveContactData();
    }
  };

  const moveToPreviousField = () => {
    if (currentField === 'phone') {
      setCurrentField('email');
    } else if (currentField === 'email') {
      setCurrentField('fullName');
    }
  };

  const getCurrentFieldValue = () => {
    switch (currentField) {
      case 'fullName': return fullName;
      case 'email': return email;
      case 'phone': return phone;
      default: return '';
    }
  };

  const getFieldLabel = () => {
    switch (currentField) {
      case 'fullName': return 'Nome Completo';
      case 'email': return 'E-mail';
      case 'phone': return 'Telefone';
      default: return '';
    }
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto py-12 px-24">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-8 text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Queremos ser seu companheiro de jornada
        </motion.h2>

        {!showForm ? (
          <motion.div
            className="flex flex-col gap-6 w-full"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <motion.button
              variants={item}
              onClick={() => navigate("/fim")}
              className="bg-[#0070E0] text-white text-lg font-semibold px-8 py-5 rounded-lg shadow-md hover:bg-[#0059b2] transition w-max text-left"
            >
              Quero conversar com um especialista
            </motion.button>

            <motion.button
              variants={item}
              onClick={() => setShowForm(true)}
              className="bg-[#0070E0] text-white text-lg font-semibold px-8 py-5 rounded-lg shadow-md hover:bg-[#0059b2] transition w-max text-left"
            >
              Deixar meus dados para contato
            </motion.button>

            <motion.button
              variants={item}
              onClick={() => setShowQRModal(true)}
              className="bg-[#0070E0] text-white text-lg font-semibold px-8 py-5 rounded-lg shadow-md hover:bg-[#0059b2] transition w-max text-left"
            >
              Escanear QR Code e saber mais
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col gap-6 w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white text-xl mb-4">
              Preencha seus dados para que possamos entrar em contato:
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Full Name Field */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                currentField === 'fullName' ? 'border-[#0070E0] bg-white/10' : 'border-gray-400 bg-white/5'
              }`}>
                <label className="block text-white text-sm font-medium mb-2">
                  Nome Completo {currentField === 'fullName' && '← Campo ativo'}
                </label>
                <div className="text-white text-lg min-h-[32px] p-2 bg-black/20 rounded">
                  {fullName || (currentField === 'fullName' ? '|' : '')}
                </div>
              </div>

              {/* Email Field */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                currentField === 'email' ? 'border-[#0070E0] bg-white/10' : 'border-gray-400 bg-white/5'
              }`}>
                <label className="block text-white text-sm font-medium mb-2">
                  E-mail {currentField === 'email' && '← Campo ativo'}
                </label>
                <div className="text-white text-lg min-h-[32px] p-2 bg-black/20 rounded">
                  {email || (currentField === 'email' ? '|' : '')}
                </div>
              </div>

              {/* Phone Field */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                currentField === 'phone' ? 'border-[#0070E0] bg-white/10' : 'border-gray-400 bg-white/5'
              }`}>
                <label className="block text-white text-sm font-medium mb-2">
                  Telefone {currentField === 'phone' && '← Campo ativo'}
                </label>
                <div className="text-white text-lg min-h-[32px] p-2 bg-black/20 rounded">
                  {phone || (currentField === 'phone' ? '|' : '')}
                </div>
              </div>
            </div>

            {/* Navigation Instructions */}
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-white text-sm">
                <strong>Campo atual:</strong> {getFieldLabel()}<br/>
                <strong>Navegação:</strong> Use os botões abaixo para alternar entre campos e enviar
              </p>
            </div>

            {/* Form Navigation Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={moveToPreviousField}
                disabled={currentField === 'fullName'}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                ← Campo Anterior
              </button>
              
              <button
                onClick={moveToNextField}
                disabled={isSubmitting}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {currentField === 'phone' ? 'Enviar Dados' : 'Próximo Campo →'}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Virtual Keyboard - only show when form is active */}
      {showForm && (
        <div className="absolute bottom-0 left-0 w-full">
          <TecladoVirtual
            onInput={handleVirtualKeyboardInput}
            onBackspace={handleBackspace}
          />
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white rounded-2xl w-11/12 max-w-md p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
              Acesse o PayPal
            </h3>
            <p className="text-gray-700 mb-6">
              Escaneie este QR Code para visitar o site do PayPal:
            </p>

            <div className="flex justify-center">
              <QRCode
                value="https://www.paypal.com"
                size={200}
                bgColor="white"
                fgColor="#0070E0"
                quietZone={10}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
