const Card = ({ text, image, title }) => {
    return (
      <div className="w-full">
        <a
          href="#"
          className="group relative block max-w-screen-sm mx-auto h-[400px]"
        >
          <span className="absolute inset-0 border-2 border-gray-200 rounded-xl transition-all duration-300 group-hover:border-gray-400" />
          
          <div className="relative flex h-full w-full rounded-xl bg-white overflow-hidden transition-all duration-500 ease-in-out transform group-hover:scale-105 shadow-sm group-hover:shadow-lg">
            {/* Logo state (default) */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out group-hover:opacity-0">
              <img
                src={image}
                alt={title}
                className="w-48 h-48 object-contain transition-all duration-500"
              />
            </div>
            
            {/* Background state (on hover) */}
            <div className="absolute inset-0 opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-10">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content container */}
            <div className="absolute inset-0 flex flex-col  p-6">
              {/* Title - slides up on hover */}
              <h3 className="text-xl font-medium sm:text-2xl transform transition-all duration-500 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100  group-hover:text-left">
                {title}
              </h3>
              
              {/* Text content - fades in on hover */}
              <div className="transform transition-all duration-500 ease-in-out translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-100 overflow-hidden">
                {Array.isArray(text) ? (
                  <ul className="mt-4 text-sm sm:text-base text-justify">
                    {text.map((item, index) => (
                      <li key={index} className="flex items-start mb-2">
                        <span className="mr-2 text-gray-600">•</span> {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm sm:text-base text-justify">{text}</p>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  };
  
  export default Card;