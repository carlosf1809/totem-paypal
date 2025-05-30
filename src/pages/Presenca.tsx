// import { useJornada } from "../context/JornadaContext";
// import { useNavigate } from "react-router-dom";
// import {
//   GlobeAltIcon,
//   ChatBubbleLeftRightIcon,
//   BuildingStorefrontIcon,
// } from "@heroicons/react/24/outline";

// export default function Presenca() {
//   const { atualizar } = useJornada();
//   const navigate = useNavigate();

//   const selecionarCanal = (canal: "site" | "redes" | "ecommerce") => {
//     atualizar({ canal });
//     navigate("/desafios");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
//       <h2 className="text-3xl font-bold">
//         Onde sua história acontece?
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
//         <div
//           className="p-6 rounded-xl shadow-[0_35px_35px_rgba(0,0,0,0.2)]  bg-white hover:bg-blue-50 cursor-pointer transition flex flex-col items-center text-center"
//           onClick={() => selecionarCanal("site")}
//         >
//           <GlobeAltIcon className="w-10 h-10 mb-3 text-blue-600" />
//           <h3 className="text-lg text-blue-800 font-semibold">Meu palco é um site</h3>
//           <p className="text-sm text-gray-600">Tenho uma loja virtual</p>
//         </div>

//         <div
//           className="p-6 rounded-xl shadow-[0_35px_35px_rgba(0,0,0,0.2)] bg-white hover:bg-blue-50 cursor-pointer transition flex flex-col items-center text-center " 
//           onClick={() => selecionarCanal("redes")}
//         >
//           <ChatBubbleLeftRightIcon className="w-10 h-10 mb-3 text-blue-600" />
//           <h3 className="text-lg text-blue-800 font-semibold">Meu negócio vive nas redes</h3>
//           <p className="text-sm text-gray-600">
//             Atendo clientes pelo WhatsApp ou redes sociais
//           </p>
//         </div>

//         <div
//           className="p-6 rounded-xl shadow-[0_35px_35px_rgba(0,0,0,0.2)] bg-white hover:bg-blue-50 cursor-pointer transition flex flex-col items-center text-center"
//           onClick={() => selecionarCanal("ecommerce")}
//         >
//           <BuildingStorefrontIcon className="w-10 h-10 mb-3 text-blue-600" />
//           <h3 className="text-lg text-blue-800 font-semibold">Estou em um e-commerce grande</h3>
//           <p className="text-sm text-gray-600">
//             Recebo muitos acessos por dia
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
