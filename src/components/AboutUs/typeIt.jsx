import React from "react";
import { TypeAnimation } from 'react-type-animation';

const TypeItComponent = () => {


  return (
    <div >
      <TypeAnimation
        sequence={[
          '"Ghoniyyun Petrol Teknik is a company specializing in providing innovative solutions and services in the oil and gas industry.',
          1000,
          '"Ghoniyyun Petrol Teknik is a company specializing in providing innovative solutions and services in the oil and gas industry. Founded in early 2024, the company began as a small enterprise focusing on technical support and equipment maintenance for petroleum operations.',
          1000,
          '"Ghoniyyun Petrol Teknik is a company specializing in providing innovative solutions and services in the oil and gas industry. Founded in early 2024, the company began as a small enterprise focusing on technical support and equipment maintenance for petroleum operations. Over the years, it expanded its portfolio to include engineering consultancy, installation of advanced technology systems, and supply chain services tailored to the energy sector."',
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