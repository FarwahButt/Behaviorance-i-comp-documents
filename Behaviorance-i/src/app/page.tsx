
import Header from "./components/header";
import Footer from "./components/footer";
import Link from "next/link";



export default function Home() {
  return (
    
    <div>
      <Header/>
      <div>
      <main className="text-white bg-black">

          <br />

{/* Our Values */}
<div id="services" className="bg-gradient-to-r from-black to-blue-950 pt-6">
<h2 className="text-5xl text-center">Our Services</h2> 


<div className="flex justify-center space-x-8 p-8">

<div className="bg-slate-600 shadow-lg rounded-lg p-6 w-80 text-center transition duration-300 transform hover:text-black hover:scale-105 ">
  <div className="flex justify-center mb-4">
    <img src="social-justice.png" alt="Human-Centric Security" className="h-12 w-12" />
  </div>
  <h2 className="text-xl font-bold mb-2">Human-Centric Security</h2>
  <p>
  We prioritize the human element in cybersecurity, understanding that technology alone cannot solve security challenges without addressing human behavior and compliance.
  </p>
</div>


<div className="bg-indigo-500 shadow-lg rounded-lg p-6 w-80 text-center transition duration-300 transform hover:text-black hover:scale-105">
  <div className="flex justify-center mb-4">
  <img src="distributed.png" alt="Integrity & Accountability" className="h-12 w-12" />
  </div>
  <h2 className="text-xl font-bold mb-2">Integrity & Accountability</h2>
  <p>
  We believe in fostering a culture where accountability and integrity are at the forefront of every decision, knowing that security starts with ethical practices.

  </p>
</div>


<div className="bg-zinc-700 shadow-lg rounded-lg p-6 w-80 text-center transition duration-300 transform hover:text-black hover:scale-105">
  <div className="flex justify-center mb-4">
    <img src="idea.png" alt="Innovation" className="h-12 w-12" />
  </div>
  <h2 className="text-xl font-bold mb-2">Innovation</h2>
  <p>
  We are committed to continuously evolving our solutions to stay ahead of emerging threats by integrating behavioral science with cutting-edge technology.

  </p>
</div>
</div>
</div>
<div className="bg-gradient-to-r from-black to-blue-950">
<div className="flex justify-center space-x-8 p-8">

<div className="bg-indigo-800 shadow-lg rounded-lg p-6 w-80 text-center transition duration-300 transform hover:text-black hover:scale-105">
  <div className="flex justify-center mb-4">
    <img src="deal.png" alt="Collaboration" className="h-12 w-12" />
  </div>
  <h2 className="text-xl font-bold mb-2">Collaboration</h2>
  <p>
  We value teamwork and knowledge-sharing, knowing that cybersecurity is a collective effort that requires the active involvement of employees, organizations, and technology.

  </p>
</div>


<div className="bg-slate-400  shadow-lg rounded-lg p-6 w-80 text-center transition duration-300 transform hover:text-black hover:scale-105">
  <div className="flex justify-center mb-4">
    <img src="resilience.png" alt="Resilience" className="h-12 w-12" />
  </div>
  <h2 className="text-xl font-bold mb-2">Resilience</h2>
  <p>
  Our approach is centered on building resilient security systems that can withstand human errors and cyber threats, turning potential weaknesses into strengths.

  </p>
</div>


<div className="bg-indigo-400 shadow-lg rounded-lg p-6 w-80 text-center transition duration-300 transform hover:text-black hover:scale-105">
  <div className="flex justify-center mb-4">
    <img src="advertising.png" alt="Awareness & Education" className="h-12 w-12" />
  </div>
  <h2 className="text-xl font-bold mb-2">Awareness & Education</h2>
  <p>
  We champion education and awareness as key pillars of our strategy, empowering individuals and organizations to make informed decisions that enhance their security posture.
  </p>
</div>
</div>
</div>

<br />

{/* About us */}

<div className="bg-gradient-to-r from-black to-blue-950 p-10">

<div className="mb-4">
  <h3 className="text-lg">About Us</h3>
</div>


<h1 className="text-4xl font-bold-900 mb-6 leading-tight">
  We Are Cybersecurity Innovators Focused On <br />
  Addressing Human Behavior in Security.
</h1>
<h2 className="text-2xl font-bold text-blue-500 mb-6">
    With 95% of Security Breaches Caused by Human Mistakes.
  </h2>

  <p >
    We understand the urgent need to transform the weakest link in cybersecurity into the strongest defense. Our mission is to integrate behavioral compliance and awareness into every layer of protection. By combining technical solutions with a deep understanding of human factors, we ensure that people and technology work together to create a more secure digital environment.
  </p>


  <div id="details" className="mt-8">
  <Link href="/about">
 <button className="transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300  rounded ring-2 ring-blue-800 ring-offset-4 ring-offset-blue-300 px-10 py-3">
      See Details
 </button>
 </Link>
  </div>
</div>
        </main>
      </div>
      <Footer/>
    </div>
  );
}
