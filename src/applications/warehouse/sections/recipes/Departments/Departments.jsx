import React, { useEffect, useState } from "react";
import "./Departments.scss";
import Cards from "./cards/Cards";

import { getRecipeCategoryParent } from "../../../../../apis/recipes/recipeCategoryParent";
import { useNavigate } from "react-router-dom";

function Departments() {


  const [data, setData] = useState([]); // Initialize data as null
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const recipeData = await getRecipeCategoryParent();
      setData(recipeData.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleAddDepartment = () => {
    navigate("/warehouse/recipes/add-recipes-parent")
  }
  const handleSearchDepartment = () => {
    navigate("/warehouse/recipes/show-recipes")

  }
  useEffect(() => {

    fetchData(); // Call fetchData when component mounts
  }, []);
  const handleCardClick = (department) => {
    // Handle click action here, for example, you can log the department name
    console.log("Clicked on department:", department);
    navigate(`/warehouse/recipes/subCategory/show-recipe-subcategory/${department}`)
  };

  return (
    <>
      <h1 className="heading text-center p-3">اقسام المخزن </h1>
      <div className="btn-container">

        <button className="dept-btn" onClick={handleAddDepartment}>
          +اضافة قسم
        </button>
        <button className="dept-btn" onClick={handleSearchDepartment}>
          +بحث عن قسم
        </button>
      </div>
      <div className="cards-container">
        <div className="row">
          {data.map((department, index) => (
            <Cards
              key={index}
              img={department.image}
              department={department.name}
              onClick={() => handleCardClick(department.id)}
            />
          ))}

        </div>
      </div>
    </>
  );
}

export default Departments;
