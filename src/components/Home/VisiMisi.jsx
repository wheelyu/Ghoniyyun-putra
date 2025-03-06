import Bg_Mission from '../../assets/mission.jpg'
import Bg_Vision from '../../assets/vision1.jpg'
import Bg_Values from '../../assets/values.jpg'
import FlipCard from "../FlipCard";
const VisiMisi = () => {
        const textVision = ["Menjadi perusahaan terdepan dalam menyediakan produk dan layanan berkualitas tinggi, serta solusi digitalisasi SPBU Pertamina yang inovatif. Kami berkomitmen untuk membangun hubungan jangka panjang dengan mitra bisnis, mengutamakan keberlanjutan, dan memberikan dampak positif bagi lingkungan"];
        const textMision = [
            "Menyediakan produk dan layanan terbaik yang memenuhi kebutuhan klien kami yang terus berkembang.",
            "Mendorong budaya inovasi dan perbaikan berkelanjutan dalam semua aspek bisnis kami.",
            "Membangun hubungan jangka panjang dengan pemangku kepentingan yang didasarkan pada kepercayaan, integritas, dan kesuksesan bersama.",
            "Mengutamakan keberlanjutan dan tanggung jawab sosial dalam semua operasi, memberikan kontribusi positif bagi lingkungan dan masyarakat."
        ]
        const textValues = ["Kami bangga dengan integritas yang tinggi dalam setiap aspek bisnis kami, menjunjung prinsip HSE (Health, Safety, and Environment) untuk memastikan keselamatan dan keberlanjutan dalam setiap operasional. Kami berkomitmen pada kualitas terbaik, memberikan produk dan layanan yang dapat diandalkan, serta memastikan keandalan dalam setiap langkah. Melalui kerja tim yang solid, kami menjadi mitra yang dapat diandalkan dalam setiap proyek yang kami jalankan."]
       
    return (
        <div>
            <div className='bg-gradient-to-l from-primary to-pink-500 bg-opacity-85 py-6 md:py-10 min-h-screen items-center justify-center flex'>
                <div className='flex flex-col md:flex-row w-full  mx-auto gap-5 px-4 md:px-8 lg:px-16'>
                    <FlipCard text={textVision}
                        title="Vision"
                        image={Bg_Vision}/>
                    <FlipCard text={textMision}
                    title="Mission"
                    image={Bg_Mission}
                    />
                    <FlipCard text={textValues}
                    title="Mission"
                    image={Bg_Values}
                    />

                </div>
            </div>
        </div>
    )
}    
export default VisiMisi