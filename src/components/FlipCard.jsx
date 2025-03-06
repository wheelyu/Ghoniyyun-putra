import React from 'react';

const Card = ({ text, image, title }) => {
  return (
    <div className="w-full  mx-auto rounded-lg overflow-hidden shadow-lg bg-white text-justify">
      {/* Image centered at the top with responsive sizing */}
      <div className="w-full flex items-center justify-center overflow-hidden p-4">
        <img 
          src={image} 
          alt={title} 
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
        />
      </div>
      
      {/* Content area below the image */}
      <div className="p-3 sm:p-4 md:p-6">
        
        {/* Text content with responsive font sizes */}
        <div className="text-gray-700">
          {Array.isArray(text) ? (
            <ul className="list-disc list-inside text-base sm:text-lg">
              {text.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-base sm:text-lg">{text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;