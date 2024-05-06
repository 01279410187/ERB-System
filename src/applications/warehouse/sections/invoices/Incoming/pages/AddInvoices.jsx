import React, { useState, useEffect } from 'react';
import DynamicForm from '../../../../../../components/shared/form/Form';
import InvoiceDetails from '../../../../../../components/shared/InvoiveDetails/InvoiceDetails';
import ItemList from '../../../../../../components/shared/itemList/ItemList';
import TotalAmount from '../../../../../../components/shared/totalAmount/TotalAmount';
import { jsPDF } from 'jspdf';
import './AddInvoice.css';
import axios from 'axios';
import { getSuppliers } from '../../../../../../apis/suppliers';

const AddInvoices = () => {
    const [items, setItems] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [invoiceDate, setInvoiceDate] = useState('');
    const [invoiceCode, setInvoiceCode] = useState('');
    const [invoiceNote, setInvoiceNote] = useState('');
    const [invoiceImage, setInvoiceImage] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [tax, setTx] = useState(0);

    useEffect(() => {
        const fetchDataSuppliers = async () => {
            try {
                const supplierData = await getSuppliers();
                setSuppliers(supplierData.data);
                console.log(suppliers);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchDataSuppliers();
    }, []);

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const calculateTotalAmount = () => {
        return items.reduce((total, item) => total + ((item.quantity * item.price) - parseInt(discount) + parseInt(tax)), 0);
    };

    const Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiODg1ZmVjMzU5NjkxZGVkZWY5MGRkNDlkNzk2ZjhjNTM0MzQ2YWU3N2MzZWFhYTM2NWFjZTQ4OTEzM2Y3YTFkMGY0ODgwMjU4YmRhODA1MDciLCJpYXQiOjE3MTQ3ODU5NTQuODkxMDMxLCJuYmYiOjE3MTQ3ODU5NTQuODkxMDM4LCJleHAiOjE3NDYzMjE5NTQuODI4MjY5LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.Q0jJ9k5mtkd6PRuCb2C0jTm37D7az5SK9_W8sgbmt9Kl2Xa3u0iUy4Pf1o5QYFkbLZ7ky21kzpMIO1APFF0zfvRzfFCUEObGIsetr12rpr-L-H0cUtuUu-p4NHcpSCj_VepurPUL9p7PHGwbUmMCeCrnR155Jjpzj_bDw_worTicLEFX8gpVua2UQRu4g5vDgH9730b80wsnobgHFOzt06Pag3SVZaDpDgCv4ACd7SMXGzRorDf4JcyE2dY1aHRpbSj8Qo4M0QOt0RlBGRcagosNx4sz-zI_GrN2a6R3xgsZY6IHZkRYPFgAAY80ptG34cBx0g37uHT6M8pQEtez_Of7zl409bVMNf6SfTmVPgxTPyx1jp5H-hw-YYSB9wjoWzPdstiiG72yrM0dAQff1FFucgiksYDmvHfZRs5-F8RMb2U46dZLVHx-tfVHJmCC8qomQrpf9x0teoUPHazQOCqK2SaaM84rq1WUNe_QTxQjfOz-PJ6px-GSOKIo7xZ3amf4EAtyJ157XdqvYs-YmCLm_ePngFqv4Sqb1iyGJuMXkMEBdD9qyQvagMbLTRRv87RWxtTixmDObF2ypJH_xGZWRgDkjQaDRn0Jt61OJHkZcMbN5yk001Mk9zDSyXSlNep6ZlTpg0d41b2LgB842vO20SIERhZuRGvbFUVck-A"

    // const handleDownloadPDF = async () => {
    //     // console.log(items);
    //     // console.log(selectedSupplier);
    //     // console.log(invoiceDate);
    //     // console.log(invoiceCode);
    //     // console.log(invoiceImage);

    //     const requestData = items.map((item, index) => ({
    //         [`recipes[${index}][recipe_id]`]: item.recipeId,
    //         [`recipes[${index}][price]`]: item.price,
    //         // Add other fields as needed, for example quantity, expire_date, etc.
    //         [`recipes[${index}][quantity]`]: item.quantity,
    //         [`recipes[${index}][expire_date]`]: item.expireDate,
    //     }));

    //     try {
    //         const response = await axios.post('http://192.168.0.116:8000/api/v1/store/invoice/create', {
    //             recipes: requestData,
    //             selectedSupplier,
    //             invoiceDate,
    //             invoiceCode,
    //             invoiceNote,
    //             // Add other fields as needed
    //             // invoiceImage: invoiceImage,
    //             // discount: discount,
    //             // tax: tax,
    //         }, {
    // headers: {
    // Authorization: `Bearer ${Token}`
    // }
    //         });
    //         console.log(response.dat)
    //         console.log('Invoice created successfully!');
    //         // Optionally, you can redirect or show a success message here
    //     } catch (error) {
    //         console.error('Error creating invoice:', error);
    //         // Handle error condition, show error message, etc.
    //     }

    // };


    const handleDownloadPDF = async () => {
        const formData = new FormData();

        items.forEach((item, index) => {
            formData.append(`recipes[${index}][recipe_id]`, item.recipeId);
            formData.append(`recipes[${index}][price]`, item.price);
            // Add other fields as needed, for example quantity, expire_date, etc.
            formData.append(`recipes[${index}][quantity]`, item.quantity);
            formData.append(`recipes[${index}][expire_date]`, item.expireDate);
        });

        formData.append('supplier_id', selectedSupplier);
        console.log(selectedSupplier)
        formData.append('type', "in_coming");
        formData.append('invoice_date', invoiceDate);
        formData.append('code', invoiceCode);
        formData.append('note', invoiceNote);
        // Add other fields as needed
        formData.append('image', invoiceImage);
        formData.append('discount', discount);
        formData.append('tax', tax);


        try {
            const response = await axios.post('http://192.168.0.116:8000/api/v1/store/invoice/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${Token}`
                },
            });
            console.log(response.data)
            console.log('Invoice created successfully!');
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Error creating invoice:', error);
            // Handle error condition, show error message, etc.
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setInvoiceImage(file);
    };

    return (
        <div className="App">
            <h1>اضافة فاتورة</h1>
            <div>
                <label htmlFor="supplierSelect">اختر المورد:</label>
                <select
                    id="supplierSelect"
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                >
                    <option value="">اختر المورد</option>
                    {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>اختر تاريخ الفاتوره:</label>
                <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </div>
            <div>
                <label>كود الفاتوره:</label>
                <input type="number" value={invoiceCode} onChange={(e) => setInvoiceCode(e.target.value)} />
            </div>
            <div>
                <label>صورة الفاتورة:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <div>
                <label> خصم على الفاتوره:</label>
                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </div>
            <div>
                <label> الضريبه المضافه:</label>
                <input type="number" value={tax} onChange={(e) => setTx(e.target.value)} />
            </div>

            <div>
                <label>  اضافة تعليق:</label>
                <input type="textarea" value={invoiceNote} onChange={(e) => setInvoiceNote(e.target.value)} />
            </div>
            <InvoiceDetails onAddItem={handleAddItem} selectedSupplier={selectedSupplier} />
            <ItemList items={items} onDeleteItem={handleDeleteItem} />
            <TotalAmount total={calculateTotalAmount()} />
            <button onClick={handleDownloadPDF}>حفظ البيانات</button>
        </div>
    );
};

export default AddInvoices;
