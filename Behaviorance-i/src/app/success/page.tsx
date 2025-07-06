// "use client";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import Navsuccess from "../components/navsuccess";



// export default function Success() {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get("userName") || "User";

//   return (
//     <div>
//         <Navsuccess/>
//     <div className=" min-h-screen  text-black flex items-center justify-center">
//       <div className="text-center space-y-6">
//         <h2 className="text-4xl font-bold">Welcome, {userName}!</h2>
//         <p className="text-lg">Your account has been created successfully.</p>
//         <br />
//         <div className="text-white flex items-center justify-between">
//         <Link href="/awareness">
//           <button className="bg-blue-800  hover:bg-indigo-400 duration-700 rounded-md shadow-lg ring-4 ring-blue-800 ring-offset-4 ring-offset-blue-300-200 px-10 py-2">
//            Awareness
//           </button>
//         </Link>

//         <Link href="/SimpleQuestions">
//           <button className="bg-blue-800  hover:bg-indigo-400 duration-700 rounded-md shadow-lg ring-4 ring-blue-800 ring-offset-4 ring-offset-blue-300-200 px-10 py-2">
//         Survey
//           </button>
//         </Link>
//         </div>

//       </div>
//     </div>
//     </div>
//   );
// }phela code




// "use client";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import Navsuccess from "../components/navsuccess";

// export default function Success() {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get("userName") || "User";

//   return (
//     <div
//       className="relative min-h-screen bg-cover bg-center"
//       style={{
//         backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/015/286/163/non_2x/abstract-background-digital-concept-cybersecurity-shield-anti-virus-malware-spy-protection-cyber-theft-security-on-a-blue-black-background-vector.jpg')`,
//       }}
//     >
//       <Navsuccess />

//       <div className="flex items-center justify-center min-h-screen bg-black/40">
//         <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-xl p-10 max-w-lg w-full text-center">
//           <div className="text-6xl mb-4">🔐</div>
//           <h2 className="text-4xl font-bold text-white mb-2">
//             Welcome, {userName}!
//           </h2>
//           <p className="text-lg text-gray-200">
//             Your cybersecurity journey starts now.
//           </p>

//           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//             <Link href="/awareness">
//               <button className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md">
//                 Awareness
//               </button>
//             </Link>
//             <Link href="/SimpleQuestions">
//               <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg shadow-md">
//                 Survey
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navsuccess from "../components/navsuccess";

export default function Success() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName") || "User";

  return (
    <div className="min-h-screen flex flex-col">
      <Navsuccess /> {/* Navbar at top */}

      {/* Background & content below navbar */}
      <div
        className="relative flex-grow bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/015/286/163/non_2x/abstract-background-digital-concept-cybersecurity-shield-anti-virus-malware-spy-protection-cyber-theft-security-on-a-blue-black-background-vector.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div> {/* overlay */}

        <div className="relative flex items-center justify-center min-h-full px-6 py-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-12 max-w-lg w-full text-center text-white">
            <div className="text-7xl mb-4">🔒</div>
            <h2 className="text-5xl font-extrabold mb-3">Welcome, {userName}!</h2>
            <p className="text-lg mb-8">Your cybersecurity journey starts now.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/awareness">
                <button className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md text-lg font-semibold transition">
                  Awareness
                </button>
              </Link>
              <Link href="/SimpleQuestions">
                <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg shadow-md text-lg font-semibold transition">
                  Survey
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
