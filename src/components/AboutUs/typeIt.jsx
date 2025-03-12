import React from "react";
import { TypeAnimation } from 'react-type-animation';

const TypeItComponent = () => {


  return (
    <div >
      <TypeAnimation
        sequence={[
          'Ghoniyyun Petrol Teknik adalah perusahaan yang memiliki spesialisasi dalam menyediakan solusi dan layanan inovatif di industri minyak dan gas.',
          1000,
          'Ghoniyyun Petrol Teknik adalah perusahaan yang memiliki spesialisasi dalam menyediakan solusi dan layanan inovatif di industri minyak dan gas. Didirikan pada awal tahun 2024, perusahaan ini dimulai sebagai usaha kecil yang fokus pada dukungan teknis dan pemeliharaan peralatan untuk operasi perminyakan.',
          1000,
          'Ghoniyyun Petrol Teknik adalah perusahaan yang memiliki spesialisasi dalam menyediakan solusi dan layanan inovatif di industri minyak dan gas. Didirikan pada awal tahun 2024, perusahaan ini dimulai sebagai usaha kecil yang fokus pada dukungan teknis dan pemeliharaan peralatan untuk operasi perminyakan. Seiring berjalannya waktu, perusahaan ini memperluas portofolionya untuk mencakup konsultasi rekayasa, instalasi sistem teknologi canggih, dan layanan rantai pasokan yang disesuaikan untuk sektor energi.',
          3000,
        ]}
        wrapper="span"
        speed={50}
        style={{ display: 'inline-block' }}
        cursor={true}
      />
    </div>
  );
};

export default TypeItComponent;