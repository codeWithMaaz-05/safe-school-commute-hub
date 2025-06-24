
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Screenshots = () => {
  const interfaces = [
    {
      title: "Parent App",
      description: "Track your child's commute, communicate with drivers, and manage payments all in one place",
      placeholder: "photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "Driver Dashboard",
      description: "Manage routes, communicate with parents, and navigate efficiently with our driver tools", 
      placeholder: "photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "School Portal",
      description: "Coordinate transportation, manage student lists, and communicate with parents and drivers",
      placeholder: "photo-1605810230434-7631ac76ec81"
    }
  ];

  return (
    <section className="py-20 bg-white" id="screenshots">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            User Interfaces
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intuitive and user-friendly interfaces designed for parents, drivers, and schools
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {interfaces.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <AspectRatio ratio={16/10}>
                  <img 
                    src={`https://images.unsplash.com/${item.placeholder}?auto=format&fit=crop&w=800&q=80`}
                    alt={item.title}
                    className="rounded-xl object-cover w-full h-full shadow-md"
                  />
                </AspectRatio>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
