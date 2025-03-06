
const FlipCard = ({text, image, title}) => {

  return (
    <div className="w-full">
    <a
        href="#"
        className="group relative block max-w-screen-sm mx-auto h-96"
    >
        <span className="absolute inset-0 border-2 rounded-xl" />
        <div className="relative flex h-full w-full transform items-end  rounded-xl bg-white transition-transform group-hover:scale-105 duration-300">
        <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <img
            src={image}
            alt=""
            className="absolute inset-0 object-contain w-full h-full"
            />
        </div>
        <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
            <h3 className="mt-4 text-xl font-medium sm:text-2xl">
            {title}
            </h3>
            {text.length === 1 ? (
                <p className="mt-4 text-sm sm:text-base text-justify">{text}</p>
            ) : (
                <ul className="mt-4 text-sm sm:text-base text-justify">
                {text.map((item, index) => (
                    <li key={index}>- {item}</li>
                ))}
                </ul>
            )}
        </div>
        </div>
    </a>
    </div>


  );
};

export default FlipCard;
