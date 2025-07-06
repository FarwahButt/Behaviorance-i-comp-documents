// "use client";
// import { useState, useEffect } from "react";
// import Nav from "../components/nav";
// import Footer from "../components/footer";
// import Link from "next/link";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [, setIsAuthenticated] = useState(false);

//   const hardcodedEmail = "emaannadeem545@gmail.com";
//   const hardcodedPassword = "Private123@";

//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = () => {
//     if (formData.email === hardcodedEmail && formData.password === hardcodedPassword) {
//       setIsAuthenticated(true);
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <main>
//       <Nav />
//       <div className="flex justify-between bg-gradient-to-r from-black to-blue-950 pb-14">
//         <div className="mt-5 text-white">
//           <p className="px-5">Cyber Security with Secure Sense Behavioral Compliance</p>

//           <div className="text-white flex-col px-32 justify-center">
//             <h3 className="font-bold mt-10 text-4xl">Sign in</h3>
//             <p>
//               <Link href="/signup">
//                 <span className="text-white font-bold cursor-pointer underline underline-offset-2">
//                   Sign up here
//                 </span>
//               </Link>
//             </p>
//             <label className="mt-5 block">
//               <span className="block text-sm font-medium">Email</span>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="text-black w-[500px] bg-white border shadow-sm border-slate-300 p-2 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
//                 placeholder="you@example.com"
//               />
//             </label>

//             <label className="mt-5 block">
//               <span className="block text-sm font-medium">Password</span>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="text-black w-[500px] bg-white border shadow-sm border-slate-300 p-2 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
//                 placeholder="Enter your password"
//               />
//             </label>

//             <div className="mt-5 flex justify-end">
//               <p className="bold">Forgot Password?</p>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <Link href= "/success">
//             <button
//               onClick={handleLogin}
//               className="transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300 rounded ring-2 ring-blue-800 ring-offset-4 ring-offset-blue-300 px-8 py-2"
//             >
//               Log in
//             </button>
//             </Link>
//           </div>
//         </div>

//         <div>
//           <img className="pb-14 mt-7" src="logimg.png" alt="" />
//         </div>
//       </div>
//       <Footer />
//     </main>
//   );
// }

"use client";
import { useState } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Login successful!");
        localStorage.setItem("userId", data.user.User_id);
        router.push("/success?userName=" + encodeURIComponent(data.user.Name));
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <main>
      <Nav />
      <div className="flex justify-between bg-gradient-to-r from-black to-blue-950 pb-14">
        <div className="mt-5 text-white">
          <p className="px-5">Cyber Security with Secure Sense Behavioral Compliance</p>

          <div className="text-white flex-col px-32 justify-center">
            <h3 className="font-bold mt-10 text-4xl">Sign in</h3>
            <p>
              <Link href="/signup">
                <span className="text-white font-bold cursor-pointer underline underline-offset-2">
                  Sign up here
                </span>
              </Link>
            </p>
            <label className="mt-5 block">
              <span className="block text-sm font-medium">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-black w-[500px] bg-white border shadow-sm border-slate-300 p-2 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="mt-5 block">
              <span className="block text-sm font-medium">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="text-black w-[500px] bg-white border shadow-sm border-slate-300 p-2 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="Enter your password"
                required
              />
            </label>

            <div className="mt-5 flex justify-end">
              <p className="bold">Forgot Password?</p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleLogin}
              className="transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300 rounded ring-2 ring-blue-800 ring-offset-4 ring-offset-blue-300 px-8 py-2"
            >
              Log in
            </button>
          </div>
        </div>

        <div>
          <img className="pb-14 mt-7" src="logimg.png" alt="Login illustration" />
        </div>
      </div>
      <Footer />
    </main>
  );
}
