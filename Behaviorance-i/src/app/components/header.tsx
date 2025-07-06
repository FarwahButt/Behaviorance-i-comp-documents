import Link from "next/link";
export default function Header() {
  return (
    <header className="text-white">
      <div className="bg-gradient-to-r from-black to-blue-950">
        {/* Navbar */}
        <div className="flex items-center justify-between px-5">
          <div className="mt-5 font-bold ">
            <h2>Behaviorance-I</h2>
          </div>
          <div className="flex gap-x-20 mt-8">
            <h3>
              <a
                href="#services"
                className=" hover:bg-blue-800 font-bold  px-3  rounded ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500 "
              >
                Services
              </a>
            </h3>

            <h3>
              <a
                href="#details"
                className=" hover:bg-blue-800 font-bold  px-3  rounded ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500"
              >
                About
              </a>
            </h3>
            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=example@example.com&su=Contact%20Behaviorance-I&body=Hi,%20I%20would%20like%20to%20learn%20more%20about%20your%20services."
  target="_blank"
  rel="noopener noreferrer"
  className="hover:bg-blue-800 font-bold px-3 rounded ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500"
>
  <h3>Contact Us</h3>
</a>
            <Link href="/login" passHref>
              <button className=" hover:bg-blue-800 font-bold  px-3  rounded ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500">
                <h3>Login</h3>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex ">
          <div className="pt-32 pl-10">
            <h1 className="text-5xl font-bold text-white">
              Cyber Sercurity with <br /> Secure Sense Behavioral Compliance
            </h1>
            <h3 className="pt-4">
              Empowering organizations with secure awareness and behavioral{" "}
              <br />
              compliance to withstand the challenges of modern cyber threats
            </h3>
            <div className="mt-8 flex ">
              <Link href="/signup">
                <button className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300  rounded ring-2 ring-blue-800 ring-offset-4 ring-offset-blue-300 px-10 py-3">
                  SignUp
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img
              className=" mt-12 h-[500px] w-full"
              src="vector.png"
              alt="simage"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
