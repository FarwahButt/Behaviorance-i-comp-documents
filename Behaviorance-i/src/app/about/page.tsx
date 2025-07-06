import Nav from "../components/nav";
import Footer from "../components/footer";

export default function About() {
  return (
    <div>
      <Nav />

      <div className="bg-gradient-to-r from-black to-blue-950">
        <div
          className="relative pt-20 h-[500px] bg-cover bg-center"
          style={{ backgroundImage: "url('image3.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "}
          {/* Dark overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-5xl font-bold mb-4">About Us</h1>
            <p className="text-white text-lg max-w-2xl text-center">
              Cyber Security Awareness is a market-leading provider of security
              and GDPR awareness training and testing managed services.
            </p>
          </div>
        </div>

        <div className="p-8  md:p-8 ">
          <p className="text-white text-lg">
            Welcome to Behaviorance-I, where we redefine cybersecurity by
            turning the weakest link into the strongest defense. Our innovative
            approach focuses on Secure Sense Behavioral Compliance, empowering
            employees to adhere to security protocols effectively. At
            Behaviorance–I, we believe that the human element in cybersecurity
            can be transformed from a vulnerability into a robust line of
            defense. Our mission is to provide organizations with the tools and
            insights needed to foster a culture of security, ensuring that every
            team member plays a vital role in protecting valuable information.
            Join us on our journey to revolutionize security protocols and make
            compliance a natural part of everyday behavior.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full py-16">
          <h1 className="text-white text-5xl font-bold  ">Our mission</h1>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div
            className=" h-[400px] w-[1300px]"
            style={{ backgroundImage: "url('image4.jpg')" }}
          ></div>
          <div className="p-8  md:p-8 h-[400px] w-[2000px]">
            <p className="text-white text-lg">
              Our mission is to empower businesses by providing solutions that
              make cybersecurity compliance intuitive and engaging for every
              team member. We believe that when employees understand the 'why'
              behind security protocols and see them as a part of their daily
              routine, they become active defenders against cyber threats.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full py-16">
          <h1 className="text-white text-5xl font-bold  ">Our Approach</h1>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="pl-7 h-[400px] w-[2000px]">
            <p className="text-white text-lg">
              Our Approach Behavioral Insights: We use advanced analytics to
              understand employee behavior, identifying areas where compliance
              may be lacking and providing targeted interventions to address
              these gaps. Training and Engagement: Our platform offers
              interactive training modules and gamified experiences that make
              learning about cybersecurity engaging and memorable. We turn
              complex security protocols into manageable and actionable habits.
              Continuous Monitoring and Feedback: Behaviorance–I provides
              real-time feedback and continuous monitoring to ensure ongoing
              compliance. Our adaptive approach evolves with the needs of your
              organization, ensuring that security is never static.
              Employee-Centric Solutions: We prioritize the user experience by
              designing solutions that fit seamlessly into daily workflows,
              reducing friction and increasing adoption rates. Our goal is to
              make security compliance as effortless as possible.
            </p>
          </div>
          <div
            className=" h-[400px] w-[1300px] mr-3 mb-3"
            style={{ backgroundImage: "url('image5.jpg')" }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
