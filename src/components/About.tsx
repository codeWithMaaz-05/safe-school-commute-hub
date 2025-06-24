
const About = () => {
  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Our Mission
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              School Commute Tracker aims to revolutionize student transportation by creating a 
              comprehensive ecosystem that ensures safety, reliability, and transparency in daily school commutes.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety First</h3>
                <p className="text-gray-600">Ensuring student safety through verified drivers and real-time monitoring</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted Network</h3>
                <p className="text-gray-600">Building a membership-based community of reliable auto drivers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Technology</h3>
                <p className="text-gray-600">Leveraging mobile technology for seamless communication and tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
