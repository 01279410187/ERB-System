import React from "react";
import "./Departments.scss";
import Cards from "./cards/Cards";
import fridgeImg from "../../../../../../public/assets/images/departments images/meets.jpg";
import sweetImg from "../../../../../../public/assets/images/departments images/sweet.jpg";
import marketImg from "../../../../../../public/assets/images/departments images/supermarket.jpg";

function Departments() {

  console.log(fridgeImg);

  const departmentsData = [
    { img: fridgeImg, dept: "الثلاجة" },
    { img: sweetImg, dept: "حلواني" },
    { img: marketImg, dept: "البقالة" },
  ];

  return (
    <>
      <h1 className="heading text-center p-3">الاقسام </h1>
      <div className="cards-container">
        <div className="row">
          {departmentsData.map((department, index) => (
            <Cards
              key={index}
              img={department.img}
              department={department.dept}
            />
          ))}

        </div>
      </div>
    </>
  );
}

export default Departments;
