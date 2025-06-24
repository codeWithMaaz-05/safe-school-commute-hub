
import { MapPin, Bell, User, Search, Phone, MessageSquare } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: User,
      title: "Dedicated Driver Membership",
      description: "Verified and trusted auto drivers who are committed to safe student transportation",
      color: "bg-blue-500"
    },
    {
      icon: MapPin,
      title: "Live Ride Tracking",
      description: "Real-time GPS tracking so parents can monitor their child's journey to and from school",
      color: "bg-green-500"
    },
    {
      icon: Bell,
      title: "Real-Time School Alerts",
      description: "Instant notifications about pickup times, delays, and important school announcements",
      color: "bg-purple-500"
    },
    {
      icon: Phone,
      title: "Emergency SOS",
      description: "One-touch emergency alert system for immediate assistance when needed",
      color: "bg-red-500"
    },
    {
      icon: MessageSquare,
      title: "Parent Dashboard",
      description: "Comprehensive interface for managing rides, payments, and communication with drivers",
      color: "bg-indigo-500"
    },
    {
      icon: Search,
      title: "School Administration",
      description: "Powerful tools for schools to manage student transportation and coordinate with drivers",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for safe, reliable, and transparent school transportation
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
