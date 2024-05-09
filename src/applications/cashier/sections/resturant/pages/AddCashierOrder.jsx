import React, { useState, useEffect } from 'react';
import InvoiceDetails from '../../../../../components/shared/InvoiveDetails/InvoiceDetails';
import ItemList from '../../../../../components/shared/itemList/ItemList';
import TotalAmount from '../../../../../components/shared/totalAmount/TotalAmount';

import './AddCashierOrder.scss';
import axios from 'axios';
import { getSuppliers } from '../../../../../apis/suppliers';
import { getAllDepartments } from '../../../../../apis/departments'

import { API_ENDPOINT, Token } from '../../../../../../config';
import { useNavigate } from 'react-router-dom';
import CashierOrderDetailes from '../../../../../components/shared/CashierOrderDetails/CashierOrderDetailes';
import CashierItemList from '../../../../../components/shared/CashierItemList/CashierItemList';
import { message } from 'antd';

const AddCashierOrder = () => {
    const [items, setItems] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [department, setDepartment] = useState([]);

    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [invoiceDate, setInvoiceDate] = useState('');
    const [invoiceCode, setInvoiceCode] = useState('');
    const [invoiceNote, setInvoiceNote] = useState('');
    const [invoiceImage, setInvoiceImage] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [tax, setTx] = useState(0);
    // const pathname = location.pathname;
    // const lastItem = pathname.split('/').pop(); // This will give you "add-Invoices"

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



    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const departmentData = await getAllDepartments();
                setDepartment(departmentData.data);
                console.log(departmentData);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchDepartment();
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
        return items.reduce((total, item) => total + ((item.quantity * item.price)), 0);
    };

    const [deliveryType, setDeliveryType] = useState("kitchen");


    const handleDownloadPDF = async () => {
        const formData = new FormData();

        items.forEach((item, index) => {
            formData.append(`products[${index}][product_id]`, item.ProductId);
            // formData.append(`products[${index}][price]`, item.price);
            // Add other fields as needed, for example quantity, expire_date, etc.
            formData.append(`products[${index}][quantity]`, item.quantity);
            // formData.append(`products[${index}][expire_date]`, item.expireDate);
        });

        // if (lastItem === "out_going") {
        //     formData.append('to', selectedDepartment)
        // }
        // if (lastItem === "returned") {
        //     formData.append('from', selectedDepartment)
        // }

        // if (lastItem === "in_coming") {
        //     formData.append('supplier_id', selectedSupplier);

        // }

        // if (lastItem === "returned") {
        //     formData.append('supplier_id', selectedSupplier || "");

        // }


        // formData.append('type', lastItem);
        formData.append('order_date', invoiceDate);
        formData.append('deleviery_type', deliveryType);
        // formData.append('code', invoiceCode);
        // formData.append('note', invoiceNote);
        // Add other fields as needed
        // formData.append('image', invoiceImage);
        formData.append('table_number', discount);
        // formData.append('tax', lastItem === "in_coming" ? tax : 0);




        try {
            const response = await axios.post(`${API_ENDPOINT}/api/v1/orders/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${Token}`
                },
            });
            console.log(response.data)
            // navigate("/warehouse/invoices/show")
            message.success('لقد تم اضافة الاوردر بنجاح');
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
        <div className="form-container">
            <h1 className='form-title'>فاتورة كاشير</h1>
            {/* <div>
                <label className='form-label' htmlFor="supplierSelect">اختر المورد:</label>
                <select
                    className='form-select'
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
                <label className='form-label' htmlFor="supplierSelect">اختر قسم:</label>
                <select
                    className='form-select'
                    id="supplierSelect"
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                    <option value="">اختر قسم</option>
                    {department.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>
            </div> */}

            <div>
                <label className='form-label'>اختر تاريخ الطلب:</label>
                <input className="form-input" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </div>

            <div>
                <label className='form-label'> اجمالى رقم:</label>
                <input className="form-input" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} onWheel={event => event.currentTarget.blur()} />
            </div>
            <div>
                <label className='form-label'>اختر نوع التسليم:</label>
                <select
                    className='form-select'
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value)}
                >
                    <option value="kitchen">مطبخ</option>
                    <option value="room">غرفة</option>
                </select>
            </div>

            <CashierOrderDetailes onAddItem={handleAddItem} selectedSupplier={selectedSupplier} />
            <CashierItemList items={items} onDeleteItem={handleDeleteItem} />
            <TotalAmount total={calculateTotalAmount()} />
            <button className='form-btn' onClick={handleDownloadPDF}>حفظ البيانات</button>
        </div>
    );
};

export default AddCashierOrder;







