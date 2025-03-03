import Maps from "../../assets/Maps.jpg";
const ProjectDigital = () => {
    return (
        <div className="h-screen flex flex-col justify-center mb-56 sm:mb-32 md:mb-56 lg:mb-40 mt-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary text-center relative mt-20 py-6 ">Project Digitalisasi</h1>
            <img src={Maps} alt="Maps" className="w-full h-full object-cover" />
        </div>
    );
}

export default ProjectDigital