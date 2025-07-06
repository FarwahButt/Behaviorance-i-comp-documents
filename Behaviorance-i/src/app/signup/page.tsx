// "use client";
// import { useState } from "react";
// import Navl from "../components/navl";
// import Footer from "../components/footer";
// import { useRouter } from "next/navigation";

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [isTermsChecked, setIsTermsChecked] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [userOtp, setUserOtp] = useState("");

//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCheckboxChange = () => {
//     setIsTermsChecked(!isTermsChecked);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!isTermsChecked) {
//       alert("Please accept the terms and conditions.");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOtp(otp);
//     setOtpSent(true);

//     try {
//       const res = await fetch("/api/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: formData.email, otp }),
//       });

//       const data = await res.json();
//       if (!data.success) {
//         alert("Failed to send OTP email.");
//       }
//     } catch (err) {
//       console.error("Error sending OTP:", err);
//       alert("Server error sending OTP.");
//     }
//   };

//   const handleOtpVerification = async () => {
//     if (userOtp === generatedOtp) {
//       try {
//         const response = await fetch("/api/signup", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name: formData.name,
//             email: formData.email,
//             password: formData.password,
//           }),
//         });

//         const data = await response.json();

//         if (data.success) {
//           router.push(`/success?userName=${formData.name}`);
//         } else {
//           alert("Failed to register user.");
//         }
//       } catch (error) {
//         console.error("Signup error:", error);
//         alert("Error connecting to server.");
//       }
//     } else {
//       alert("Incorrect OTP. Please try again.");
//     }
//   };

//   const isFormValid =
//     formData.name &&
//     formData.email &&
//     formData.password &&
//     formData.confirmPassword &&
//     formData.password === formData.confirmPassword &&
//     isTermsChecked;

//   return (
//     <div>
//       <Navl />
//       {otpSent ? (
//         <div className="min-h-screen bg-gradient-to-r from-black to-blue-950 text-white flex items-center justify-center">
//           <div className="text-center space-y-6">
//             <h2 className="text-3xl font-bold">Enter OTP</h2>
//             <input
//               type="text"
//               value={userOtp}
//               onChange={(e) => setUserOtp(e.target.value)}
//               placeholder="Enter the OTP"
//               className="text-black px-4 py-2 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleOtpVerification}
//               className="mt-4 bg-blue-800 px-6 py-2 rounded hover:bg-blue-600"
//             >
//               Verify OTP
//             </button>
//           </div>
//         </div>
//       ) : (
//         // Signup Form
//         <div className="bg-gradient-to-r from-black to-blue-950 text-white flex justify-between">
//           <div>
//             <img
//               className="pb-14 mt-7 h-[700px] pl-10"
//               src="signimg.png"
//               alt="Signup Illustration"
//             />
//           </div>

//           <div>
//             <h3 className="mt-7 pl-40">
//               Cyber Security with Secure Sense Behavioral Compliance
//             </h3>
//             <form onSubmit={handleSubmit} className="mt-10 px-48">
//               <h3 className="mt-6 text-4xl">Create Account</h3>

//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="text-black w-[500px] bg-white border shadow-sm border-gray-300 p-2 mt-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 block rounded-md sm:text-sm"
//                 placeholder="Enter Your Name"
//                 required
//               />

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="text-black w-[500px] bg-white border shadow-sm border-gray-300 p-2 mt-6 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 block rounded-md sm:text-sm"
//                 placeholder="you@example.com"
//                 required
//               />

//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password *"
//                 className="text-black w-[500px] px-4 py-2 mt-6 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />

//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="text-black w-[500px] px-4 py-2 mt-6 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />

//               <div className="mt-6">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={isTermsChecked}
//                     onChange={handleCheckboxChange}
//                     className="mr-2"
//                   />
//                   I accept the{" "}
//                   <a href="/terms" className="text-blue-400 underline ml-1">
//                     terms and conditions
//                   </a>
//                 </label>
//               </div>

//               <div className="flex justify-center mt-7">
//                 <button
//                   type="submit"
//                   disabled={!isFormValid}
//                   className={`transition ease-in-out delay-150 ${
//                     isFormValid
//                       ? "bg-blue-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400"
//                       : "bg-gray-500 cursor-not-allowed"
//                   } duration-300 rounded ring-2 ring-blue-800 ring-offset-4 ring-offset-blue-300 px-8 py-2`}
//                 >
//                   Sign Up
//                 </button>
//               </div>

//               <div className="flex items-center my-4">
//                 <div className="flex-grow border-t border-gray-300"></div>
//                 <span className="mx-2 text-gray-500">OR</span>
//                 <div className="flex-grow border-t border-gray-300"></div>
//               </div>

//               <div className="flex flex-col items-center space-y-4">
//                 <button className="flex items-center justify-center w-full max-w-sm px-4 py-2 space-x-2 text-gray-700 bg-white border border-gray-300 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300">
//                   <img
//                     src="google.png"
//                     alt="Google logo"
//                     className="w-5 h-5"
//                   />
//                   <span>Continue with Google</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       <Footer />
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Navl from "../components/navl";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setIsTermsChecked((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;

    if (!strongPasswordRegex.test(formData.password)) {
    alert("Password must include at least one uppercase letter and one special character.");
      return;
      }

    if (!isTermsChecked) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Failed to send OTP.");
      } else {
        alert("OTP sent to your email.");
      }
    } catch (err) {
      console.error("OTP send error:", err);
      alert("Server error sending OTP.");
    }
  };

  const handleOtpVerification = async () => {
    if (userOtp === generatedOtp) {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            otp: generatedOtp,
          }),
        });

        const data = await response.json();
        if (data.success) {
          router.push(`/success?userName=${formData.name}`);
        } else {
          alert(data.error || "Signup failed.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Signup failed due to server error.");
      }
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    isTermsChecked;

  return (
    <div>
      <Navl />
      {otpSent ? (
        // OTP entry UI
        <div className="min-h-screen bg-gradient-to-r from-black to-blue-950 text-white flex items-center justify-center">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Enter OTP</h2>
            <input
              type="text"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              placeholder="Enter the OTP"
              className="text-black px-4 py-2 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleOtpVerification}
              className="mt-4 bg-blue-800 px-6 py-2 rounded hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </div>
        </div>
      ) : (
        // Signup form
        <div className="bg-gradient-to-r from-black to-blue-950 text-white flex justify-between">
          <div>
            <img
              className="pb-14 mt-7 h-[700px] pl-10"
              src="signimg.png"
              alt="Signup Illustration"
            />
          </div>

          <div>
            <h3 className="mt-7 pl-40">
              Cyber Security with Secure Sense Behavioral Compliance
            </h3>
            <form onSubmit={handleSubmit} className="mt-10 px-48">
              <h3 className="mt-6 text-4xl">Create Account</h3>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-black w-[500px] bg-white border shadow-sm border-gray-300 p-2 mt-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 block rounded-md sm:text-sm"
                placeholder="Enter Your Name"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-black w-[500px] bg-white border shadow-sm border-gray-300 p-2 mt-6 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 block rounded-md sm:text-sm"
                placeholder="you@example.com"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password *"
                className="text-black w-[500px] px-4 py-2 mt-6 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="text-black w-[500px] px-4 py-2 mt-6 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isTermsChecked}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  I accept the{" "}
                  <a href="/terms" className="text-blue-400 underline ml-1">
                    terms and conditions
                  </a>
                </label>
              </div>

              <div className="flex justify-center mt-7">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`transition ease-in-out delay-150 ${
                    isFormValid
                      ? "bg-blue-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400"
                      : "bg-gray-500 cursor-not-allowed"
                  } duration-300 rounded ring-2 ring-blue-800 ring-offset-4 ring-offset-blue-300 px-8 py-2`}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

