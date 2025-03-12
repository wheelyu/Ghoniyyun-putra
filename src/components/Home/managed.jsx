import Pekalongan from "../../assets/pekalongan.jpg"
import Bogor from "../../assets/bogor.jpg"
import Banyumas from "../../assets/banyumas.jpg"
const Managed = () => {

    const data = [
        {
            id: 1,
            name: "Spbu 44.531.29 Kab. Banyumas, Jawa Tengah",
            img: Banyumas,
            link: "https://maps.app.goo.gl/dCTY3HnSDmk9hxuD9",
            address: "Jl. Nasional III, Pegadungan, Rawalo, Kec. Rawalo, Kabupaten Banyumas, Jawa Tengah 53172",
            year: 2010
        },
        {
            id: 2,
            name: "Spbu 34.16921 Kab. Bogor, Jawa Barat ",
            img: Bogor,
            link: "https://maps.app.goo.gl/vVvWq8vJq9gHJM1t6",
            address: "Jl. Raya Bojong Gede Baru, Bojong Baru, Kecamatan Bojonggede, Kabupaten Bogor, Jawa Barat 16920",
            year: 2015
        },
        {
            id: 3,
            name: "SPBU 44.511.26 Kota Pekalongan, Jawa Tengah ",
            img: Pekalongan,
            link: "https://maps.app.goo.gl/1qg4dajpWmTZRk2k8",
            address: "Jl. Hos Cokroaminoto, Landungsari, Kec. Pekalongan Tim., Kota Pekalongan, Jawa Tengah 51129",
            year: 2023
        }
    ]
    return (
        <div>
        <div className="text-primary text-center flex text-3xl justify-center font-bold mt-10">
            Managed by Ghoniyyun
        </div>
        <div className="grid grid-cols-1  gap-4 mt-5">
            {data.map((item) => (

                <div className="bg-white flex gap-5 justify-between rounded-lg shadow-md p-4 border-b-4 border-gray-200 hover:border-b-primary hover:border-b-4 transition-all duration-300" key={item.id}>
                    <div className="">
                        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <p className="text-gray-700 text-sm">{item.address}</p>
                        </a>
                        <p className="text-gray-500">{item.year}</p>
                    </div>
                    <div className=""> 
                        <img src={item.img} alt={item.name} 
                        className="w-36 h-36  object-cover" />
                    </div>
                </div>

            ))}
            </div>
        </div>
    )
}

export default Managed