import React, { useState } from "react";
import "./InvoiceCategory.scss"
import Button from "./Button/Button";
// import Cards from "./cards/Cards";
// import fridgeImg from "../../../../../../public/assets/images/Categories images/meets.jpg";
// import sweetImg from "../../../../../../public/assets/images/Categories images/sweet.jpg";
// import marketImg from "../../../../../../public/assets/images/Categories images/supermarket.jpg";

function Categories(props) {

    //   console.log(fridgeImg);

    const CategoriesData = [
        { cat: "الوارد", route: "/warehouse/invoices/incoming/show-incomig" },
        { cat: "الصادر", route: "/warehouse/invoices/outgoing/show-outgoing" },
        { cat: "المرتجع", route: "/warehouse/invoices/returned/show-returned" },
    ];

    return (
        <>
            <div className="invoice-container">
                <h1 className="heading text-center p-3">الفواتير </h1>
                <div className="row">
                    {CategoriesData.map((category, index) => (
                        <Button
                            key={index}
                            title={category.cat}
                            routes={category.route}


                        />
                    ))}

                </div>
            </div>
        </>
    );
}

export default Categories;
