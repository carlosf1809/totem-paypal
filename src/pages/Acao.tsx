// src/pages/Acao.tsx
import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import TecladoVirtual from "../components/TecladoVirtual";
import TecladoNumerico from "../components/TecladoNumerico";
import { QRCodeCanvas } from "qrcode.react";

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

  // Validation computed property
  const isFormValid = email.trim() || phone.trim();

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
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-white">
      {/* Main content area - takes only needed space */}
      <div className="flex" style={{ backgroundColor: 'var(--paypal-dark)' }}>
        {/* Left side - Contact Form */}
        <div className="flex-1 flex flex-col justify-start overflow-auto py-8 px-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Deixe seus dados para contato
          </motion.h2>

          <motion.div
            className="flex flex-col gap-4 w-full max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-white/90 mb-6 text-center text-lg">
              Preencha seus dados para que possamos entrar em contato:
            </p>

            {/* Nome Completo */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Nome Completo (opcional)</label>
              <div 
                className={`relative border-2 rounded-lg transition-all cursor-text ${
                  currentField === 'fullName' 
                    ? 'border-[#0070E0] bg-blue-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                onClick={() => setCurrentField('fullName')}
              >
                <input
                  type="text"
                  value={fullName}
                  onChange={() => {}} // Controlled by virtual keyboard
                  className="w-full px-4 py-3 text-lg bg-transparent border-none outline-none text-gray-800"
                  placeholder="Digite seu nome completo"
                  readOnly
                />
                {currentField === 'fullName' && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0070E0] animate-pulse">|</span>
                )}
              </div>
            </div>

            {/* E-mail */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">E-mail</label>
              <div 
                className={`relative border-2 rounded-lg transition-all cursor-text ${
                  currentField === 'email' 
                    ? 'border-[#0070E0] bg-blue-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                onClick={() => setCurrentField('email')}
              >
                <input
                  type="email"
                  value={email}
                  onChange={() => {}} // Controlled by virtual keyboard
                  className="w-full px-4 py-3 text-lg bg-transparent border-none outline-none text-gray-800"
                  placeholder="Digite seu e-mail"
                  readOnly
                />
                {currentField === 'email' && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0070E0] animate-pulse">|</span>
                )}
              </div>
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Telefone</label>
              <div 
                className={`relative border-2 rounded-lg transition-all cursor-text ${
                  currentField === 'phone' 
                    ? 'border-[#0070E0] bg-blue-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                onClick={() => setCurrentField('phone')}
              >
                <input
                  type="tel"
                  value={phone}
                  onChange={() => {}} // Controlled by virtual keyboard
                  className="w-full px-4 py-3 text-lg bg-transparent border-none outline-none text-gray-800"
                  placeholder="Digite seu telefone"
                  readOnly
                />
                {currentField === 'phone' && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0070E0] animate-pulse">|</span>
                )}
              </div>
            </div>

            {/* Empresa */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Empresa (opcional)</label>
              <div 
                className={`relative border-2 rounded-lg transition-all cursor-text ${
                  currentField === 'company' 
                    ? 'border-[#0070E0] bg-blue-50' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                onClick={() => setCurrentField('company')}
              >
                <input
                  type="text"
                  value={company}
                  onChange={() => {}} // Controlled by virtual keyboard
                  className="w-full px-4 py-3 text-lg bg-transparent border-none outline-none text-gray-800"
                  placeholder="Digite o nome da sua empresa"
                  readOnly
                />
                {currentField === 'company' && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0070E0] animate-pulse">|</span>
                )}
              </div>
            </div>

            {/* Validation message */}
            {!isFormValid && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg">
                <p className="text-sm font-medium">
                  ⚠️ Atenção: O nome é opcional, mas é necessário informar pelo menos um: E-mail OU Telefone
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-4 mt-6">
              <motion.button
                onClick={moveToPreviousField}
                disabled={currentField === 'fullName'}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Campo Anterior
              </motion.button>
              
              <motion.button
                onClick={currentField === 'company' ? saveContactData : moveToNextField}
                className="flex-1 px-6 py-3 bg-[#0070E0] text-white rounded-lg hover:bg-[#0059b2] transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentField === 'company' ? 'Enviar Dados' : 'Próximo Campo →'}
              </motion.button>

              <motion.button
                onClick={() => navigate('/')}
                className="px-6 py-3 border-2 border-white text-white bg-transparent rounded-lg hover:bg-white hover:text-gray-800 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sair
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right side - QR Code */}
        <div className="w-96 flex flex-col justify-center items-center p-8">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Acesse o PayPal
            </h3>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Escaneie este QR Code para visitar o site do PayPal:
            </p>
            
            <div className="flex justify-center mb-4">
              <QRCodeCanvas
                value="https://www.paypal.com/br"
                size={200}
                level="M"
                includeMargin={true}
                className="border border-gray-200 rounded-lg"
                fgColor="#003087"
                bgColor="#FFFFFF"
              />
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              https://www.paypal.com/br
            </p>
          </motion.div>
        </div>
      </div>

      {/* Keyboard area - white background */}
      <div className="bg-white">
        {currentField === 'phone' ? (
          <TecladoNumerico onInput={handleVirtualKeyboardInput} onBackspace={handleBackspace} />
        ) : (
          <TecladoVirtual 
            onInput={handleVirtualKeyboardInput} 
            onBackspace={handleBackspace} 
            onEnter={currentField === 'company' ? saveContactData : moveToNextField}
          />
        )}
      </div>
    </div>
  );
}
