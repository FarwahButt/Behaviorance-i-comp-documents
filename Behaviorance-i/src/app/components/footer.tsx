export default function Footer(){
    return( 
<footer className="bg-black text-white py-10">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

      <div className="col-span-2">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Behaviorance-I</h2>
        </div>
        <p className="mb-4">
        Cyber Sercurity with Secure Sense Behavioral Compliance
        </p>

        <div className="flex space-x-4">
          <a href="#" className=" hover:text-blue-800">
            <i className="fab fa-linkedin"></i>
          </a>

          <a href="mailto:behavioralsec@gmail.com" className="hover:text-blue-800">
  <i className="fas fa-envelope"></i> Email: behavioralsec@gmail.com
</a>


          <a href="#" className=" hover:text-blue-800">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className=" hover:text-blue-800">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

  
      <div>
        <h3 className="text-lg font-bold mb-2">Our Services</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Data Security</a></li>
          <li><a href="#" className="hover:underline">Website Security</a></li>
          <li><a href="#" className="hover:underline">Document Security</a></li>
          <li><a href="#" className="hover:underline">Database Security</a></li>
        </ul>
      </div>

   
      <div>
        <h3 className="text-lg font-bold mb-2">Page</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Our Team</a></li>
          <li><a href="#" className="hover:underline">Pricing</a></li>
          <li><a href="#" className="hover:underline">Our Blog</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Links</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Term Of Use</a></li>
          <li><a href="#" className="hover:underline">Privacy Policy</a></li>
        </ul>
      </div>

    </div>

    <div className="border-t border-white mt-8 pt-4 text-center">
      <p className="text-sm ">&copy; 2024 Behaviorance-I. All rights reserved.</p>
    </div>
  </div>
</footer>

    )
 }