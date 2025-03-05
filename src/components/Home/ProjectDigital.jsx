import Maps from "../../assets/Maps.jpg";
import IndonesiaMap from "../IndonesiaMap";
const ProjectDigital = () => {
    return (
        <div className="h-screen flex flex-col justify-center  sm:mb-32 md:mb-56 lg:mb-40 ">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary text-center relative  py-6 ">Project Digitalisasi</h1>
            <IndonesiaMap />
        </div>
    );
}

export default ProjectDigital