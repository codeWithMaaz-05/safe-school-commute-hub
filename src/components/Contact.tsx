
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Involved
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join our community of parents, schools, and drivers working together for safer school transport
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" className="mt-1 bg-white/20 border-white/30 text-white placeholder-white/70" />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="mt-1 bg-white/20 border-white/30 text-white placeholder-white/70" />
              </div>
              <div>
                <Label htmlFor="role" className="text-white">I am a...</Label>
                <select id="role" className="mt-1 w-full p-2 rounded-md bg-white/20 border border-white/30 text-white">
                  <option value="" className="text-gray-800">Select your role</option>
                  <option value="parent" className="text-gray-800">Parent</option>
                  <option value="school" className="text-gray-800">School Administrator</option>
                  <option value="driver" className="text-gray-800">Auto Driver</option>
                </select>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Information Cards */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-3">For Parents</h4>
              <p className="text-blue-100 mb-4">
                Ensure your child's safety with our verified driver network and real-time tracking.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-3">For Schools</h4>
              <p className="text-blue-100 mb-4">
                Streamline your transportation management with our comprehensive school portal.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                Get Started
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-3">For Drivers</h4>
              <p className="text-blue-100 mb-4">
                Join our trusted network of drivers and grow your business with steady income.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
