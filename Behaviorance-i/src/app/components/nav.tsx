import Link from "next/link"

export default function Nav(){
    return(
        
        <div className="bg-gradient-to-l  from-black to-blue-950 opacity-75  text-white pt-8">
       <div className="flex items-center justify-between px-5">
        <div className=" font-bold mb-4 "><h2>Behaviorance-I</h2></div>
        <div className="mb-5 flex gap-x-20 ">
       <Link href="/">
       <h3  className=" hover:bg-blue-800 font-bold  px-3  rounded ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500 ">Home</h3>
       </Link>
       <Link href="/about">
        <h3  className=" hover:bg-blue-800 font-bold  px-3  rounded ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500">About</h3>
        </Link>
        
        <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=example@example.com&su=Contact%20Behaviorance-I&body=Hi,%20I%20would%20like%20to%20learn%20more%20about%20your%20services."
  target="_blank"
  rel="noopener noreferrer"
  className="hover:bg-blue-800 font-bold px-3 rounded ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500"
>
  <h3>Contact Us</h3>
</a>
        <Link href="/signup" passHref>
        <button  className=" hover:bg-blue-800 font-bold  px-3  rounded ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500"><h3>Signup </h3></button> 
        </Link>
        </div>
       </div>
       </div>
    )
}