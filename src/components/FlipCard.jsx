import React from 'react';

const Card = ({ text, image, title }) => {
  return (
    <div className="w-full  mx-auto rounded-lg overflow-hidden shadow-lg bg-white text-justify">
      {/* Image centered at the top */}
      <div className="w-full  h-fit flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="w-48 h-48 object-contain" />
      </div>
      
      {/* Content area below the image */}
      <div className="p-6">
        
        {/* Text content */}
        <div className="text-gray-700">
          {Array.isArray(text) ? (
            <ul className="list-disc list-inside text-lg">
              {text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg">{text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;