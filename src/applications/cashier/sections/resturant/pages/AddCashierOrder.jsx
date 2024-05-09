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
    const [fields, setFields] = useState([]);
    const [selectedParent, setSelectedParent] = useState('');
    // const pathname = location.pathname;
    // const lastItem = pathname.split('/').pop(); // This will give you "add-Invoices"

    const [ProductCategoryParents, setProductCategoryParents] = useState([]);
    const [ProductCategories, setProductCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        fetchCustomerCategoryParents();
    }, []);



    console.log(selectedProduct)

    const fetchCustomerCategoryParents = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/product/customers/parent`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            const data = await response.json();
            setProductCategoryParents(data.data);
            console.log(data)

        } catch (error) {
            console.error('Error fetching Product category parents:', error);
        }
    };

    const handleParentChange = async (parentId) => {
        setSelectedParent(parentId);
        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/product/customers/${parentId}`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            const data = await response.json();
            setProductCategories(data.data);
        } catch (error) {
            console.error('Error fetching Product categories:', error);
        }
    };



    useEffect(() => {
        setFields([
            {
                label: 'نوع الدفع ',
                type: 'select',
                placeholder: 'اختر نوع الدفع',
                options: ProductCategoryParents?.map(parent => ({ value: parent.id, label: parent.name })) || [],
                required: true,
                onChange: handleParentChange
            },
            {
                label: 'العميل',
                type: 'select',
                placeholder: 'اختر  نوع العميل ',
                options: ProductCategories?.map(category => ({ value: category.id, label: category.name })) || [],
                required: true,
                onChange: (value) => setSelectedProduct(value)
            },
        ]);
    }, [ProductCategoryParents, ProductCategories]);




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
                    'Content-Type': 'multipart/form-cashier-data',
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
        <div className="form-cashier-container">
            <h1 className='form-cashier-title'>فاتورة الكاشير</h1>
            <div className='form-cashier-product-category-parent'>
                <div className='form-cashier-product-category'>
                    {fields.map((field, index) => (
                        <div key={index}
                            className='form-cashier-select-wrraper'
                        >
                            <label className="form-label" >{field.label}</label>
                            <select
                                className='form-select'
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                required={field.required}>
                                <option value="">{field.placeholder}</option>
                                {field.options.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>

            <div className="form-cashier-details-parent">
                <div>
                    <label className='form-cashier-label'>اسم الكاشير:</label>
                    <input className="form-cashier-input" type="text" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                </div>
                <div>
                    <label className='form-cashier-label'> رقم التربيزة:</label>
                    <input className="form-cashier-input" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} onWheel={event => event.currentTarget.blur()} />
                </div>
                <div>
                    <label className='form-cashier-label'>اسم العميل:</label>
                    <input className="form-cashier-input" type="text" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                </div>
                <div>
                    <label className='form-cashier-label'> نسبة الخصم:</label>
                    <input className="form-cashier-input" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} onWheel={event => event.currentTarget.blur()} />
                </div>
                <div>
                    <label className='form-cashier-label'>سبب الخصم:</label>
                    <input className="form-cashier-input" type="text" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                </div>
                {/* <div>
                    <label className='form-cashier-label'>اختر تاريخ الطلب:</label>
                    <input className="form-cashier-input" type="datetime-local" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                </div> */}
            </div>
            <CashierOrderDetailes onAddItem={handleAddItem} selectedSupplier={selectedSupplier} />
            <CashierItemList items={items} onDeleteItem={handleDeleteItem} />
            <TotalAmount total={calculateTotalAmount()} />
            <button className='form-cashier-btn' onClick={handleDownloadPDF}>حفظ البيانات</button>
        </div>
    );
};

export default AddCashierOrder;







