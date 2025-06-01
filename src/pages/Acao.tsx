// src/pages/Acao.tsx
import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import TecladoVirtual from "../components/TecladoVirtual";
import TecladoNumerico from "../components/TecladoNumerico";
import { QRCode } from "react-qrcode-logo";

export default function Acao() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  
  // UI states
  const [currentField, setCurrentField] = useState<'fullName' | 'email' | 'phone' | 'company'>('fullName');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveContactData = async () => {
    // New validation: Name is optional, but require either phone OR email
    if (!email.trim() && !phone.trim()) {
      alert('Por favor, preencha pelo menos um: E-mail ou Telefone');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Update context with contact data - the Fim page will handle saving to storage
      atualizar({ 
        email: email.trim() || undefined, 
        fullName: fullName.trim() || undefined, 
        phone: phone.trim() || undefined,
        company: company.trim() || undefined
      });
      
      console.log('Contact data updated in context');
      
      // Navigate to success page (which will save all journey data)
      navigate("/fim");
      
    } catch (error) {
      console.error('Error updating contact data:', error);
      alert('Erro ao salvar dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Don't format if empty
    if (!numbers) return '';
    
    // Limit to 11 digits max (2 area code + 9 mobile digits)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Format based on length
    if (limitedNumbers.length <= 2) {
      return `(${limitedNumbers}`;
    } else if (limitedNumbers.length <= 6) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
      // Landline format: (XX) XXXX-XXXX
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    } else {
      // Mobile format: (XX) XXXXX-XXXX
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
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
        if (value === "CLEAR_ALL") {
          setPhone("");
        } else {
          // Add the new digit and format
          const currentNumbers = phone.replace(/\D/g, '');
          const newNumbers = currentNumbers + value;
          const formatted = formatPhoneNumber(newNumbers);
          setPhone(formatted);
        }
        break;
      case 'company':
        setCompany(prev => prev + value);
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
        // Remove last character and reformat
        const currentNumbers = phone.replace(/\D/g, '');
        const newNumbers = currentNumbers.slice(0, -1);
        const formatted = formatPhoneNumber(newNumbers);
        setPhone(formatted);
        break;
      case 'company':
        setCompany(prev => prev.slice(0, -1));
        break;
    }
  };

  const moveToNextField = () => {
    if (currentField === 'fullName') {
      setCurrentField('email');
    } else if (currentField === 'email') {
      setCurrentField('phone');
    } else if (currentField === 'phone') {
      setCurrentField('company');
    } else {
      // Submit when on last field and pressing next
      saveContactData();
    }
  };

  const moveToPreviousField = () => {
    if (currentField === 'company') {
      setCurrentField('phone');
    } else if (currentField === 'phone') {
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
      case 'company': return company;
      default: return '';
    }
  };

  const getFieldLabel = () => {
    switch (currentField) {
      case 'fullName': return 'Nome Completo';
      case 'email': return 'E-mail';
      case 'phone': return 'Telefone';
      case 'company': return 'Empresa';
      default: return '';
    }
  };

  return (
    <div className="relative w-full h-screen flex overflow-hidden">
      {/* Left side - Contact Form */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-auto py-12 px-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Deixe seus dados para contato
        </motion.h2>

        <motion.div
          className="flex flex-col gap-6 w-full max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-white text-lg mb-4 text-center">
            Preencha seus dados para que possamos entrar em contato:
          </p>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Full Name Field */}
            <div className={`p-4 rounded-lg border-2 transition-all ${
              currentField === 'fullName' ? 'border-[#0070E0] bg-white/10' : 'border-gray-400 bg-white/5'
            }`}>
              <label className="block text-white text-sm font-medium mb-2">
                Nome Completo (opcional)
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
                E-mail
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
                Telefone
              </label>
              <div className="text-white text-lg min-h-[32px] p-2 bg-black/20 rounded">
                {phone || (currentField === 'phone' ? '|' : '')}
              </div>
            </div>

            {/* Company Field */}
            <div className={`p-4 rounded-lg border-2 transition-all ${
              currentField === 'company' ? 'border-[#0070E0] bg-white/10' : 'border-gray-400 bg-white/5'
            }`}>
              <label className="block text-white text-sm font-medium mb-2">
                Empresa (opcional)
              </label>
              <div className="text-white text-lg min-h-[32px] p-2 bg-black/20 rounded">
                {company || (currentField === 'company' ? '|' : '')}
              </div>
            </div>
          </div>

          {/* Validation Notice */}
          <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <strong>Atenção:</strong> O nome é opcional, mas é necessário informar pelo menos um: E-mail OU Telefone
            </p>
          </div>

          {/* Navigation Instructions
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white text-sm">
              <strong>Campo atual:</strong> {getFieldLabel()}<br/>
              <strong>Teclado:</strong> {currentField === 'phone' ? 'Numérico (ideal para telefone)' : 'Completo (com letras e símbolos)'}<br/>
              <strong>Navegação:</strong> Use os botões abaixo para alternar entre campos e enviar
            </p>
          </div> */}

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
              {currentField === 'company' ? 'Enviar Dados' : 'Próximo Campo →'}
            </button>

            {/* <button
              onClick={() => navigate("/fim")}
              className="bg-[#0070E0] text-white px-6 py-3 rounded-lg hover:bg-[#0059b2] transition"
            >
              Pular e conversar com especialista
            </button> */}
          </div>
        </motion.div>
      </div>

      {/* Right side - QR Code */}
      <div className="w-96 flex flex-col justify-center items-center p-12 bg-white/5 border-l border-white/20">
        <motion.div
          className="bg-white rounded-2xl p-6 text-center shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            Acesse o PayPal
          </h3>
          <p className="text-gray-700 mb-6">
            Escaneie este QR Code para visitar o site do PayPal:
          </p>

          <div className="flex justify-center mb-4">
            <QRCode
              value="https://www.paypal.com"
              size={200}
              bgColor="white"
              fgColor="#0070E0"
              quietZone={10}
            />
          </div>
          
          <p className="text-gray-600 text-sm">
            paypal.com
          </p>
        </motion.div>
      </div>

      {/* Virtual Keyboard - show different keyboards based on field */}
      <div className="absolute bottom-0 left-0 w-full">
        {currentField === 'phone' ? (
          <TecladoNumerico
            onInput={handleVirtualKeyboardInput}
            onBackspace={handleBackspace}
          />
        ) : (
          <TecladoVirtual
            onInput={handleVirtualKeyboardInput}
            onBackspace={handleBackspace}
          />
        )}
      </div>
    </div>
  );
}
