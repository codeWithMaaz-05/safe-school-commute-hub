
const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Register & Verify",
      description: "Parents, drivers, and schools create verified accounts with background checks and documentation",
      color: "bg-blue-500"
    },
    {
      step: "2", 
      title: "Match & Connect",
      description: "Our system matches families with nearby verified drivers based on routes and schedules",
      color: "bg-green-500"
    },
    {
      step: "3",
      title: "Track & Communicate",
      description: "Real-time tracking, notifications, and seamless communication throughout the journey",
      color: "bg-purple-500"
    },
    {
      step: "4",
      title: "Safe Arrival",
      description: "Confirmation of safe pickup and drop-off with automated notifications to all parties",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50" id="how-it-works">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to ensure safe and reliable school transportation
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-300 z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg`}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
