
import React, { useState, useEffect } from 'react';

import TotalAmount from '../../../../../../components/shared/totalAmount/TotalAmount';

import './AddCashierOrder.scss';
import axios from 'axios';


import { API_ENDPOINT, Token } from '../../../../../../../config';
import CashierOrderDetailes from '../../../../../../components/shared/CashierOrderDetails/CashierOrderDetailes';
import CashierItemList from '../../../../../../components/shared/CashierItemList/CashierItemList';
import { message } from 'antd';


const AddCashierOrder = () => {
    const [items, setItems] = useState([]);
    const [tableNumber, setTableNumber] = useState(0);
    const [discountReason, setDiscontReason] = useState("");
    const [CashierName, setCahierName] = useState("احمد بركات");
    const [customerName, setCustomerName] = useState(" ");
    const [discount, setDiscount] = useState(0);
    const [tax, setTx] = useState(0);
    const [fields, setFields] = useState([]);
    const [selectedParent, setSelectedParent] = useState('');
    const [errors, setErrors] = useState({});

    const [ProductCategoryParents, setProductCategoryParents] = useState([]);
    const [ProductCategories, setProductCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        fetchCustomerCategoryParents();
    }, []);

    const validateTableNumber = (value) => {
        if (value <= 0) {
            return "رقم التربيزة يجب أن يكون أكبر من صفر";
        }
        return "";
    };

    const validateCustomerName = (value) => {
        if (!value.trim()) {
            return "يجب أن تدخل اسم العميل";
        }
        return "";
    };

    const validateDiscount = (value) => {
        if (value < 0) {
            return "نسبة الخصم يجب أن تكون أكبر من أو تساوي صفر";
        }
        return "";
    };

    const validateDiscountReason = (value) => {
        if (!value.trim()) {
            return "يجب أن تدخل سبب الخصم";
        }
        return "";
    };

    const validateSelection = (value) => {
        if (!value) {
            return "يجب اختيار قيمة";
        }
        return "";
    };

    const validateForm = () => {
        const errors = {};
        errors.tableNumber = validateTableNumber(tableNumber);
        errors.customerName = validateCustomerName(customerName);
        errors.discount = validateDiscount(discount);
        errors.discountReason = validateDiscountReason(discountReason);
        errors.selectedProduct = validateSelection(selectedProduct); // Validation for selection field
        setErrors(errors);
        return Object.values(errors).every(error => error === "");
    };

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

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        const formData = new FormData();

        items.forEach((item, index) => {
            formData.append(`products[${index}][product_id]`, item.ProductId);

            formData.append(`products[${index}][quantity]`, item.quantity);
        });
        const date = new Date()
        const datetype = new Date(date.toLocaleString()); // Assuming this is your date string
        const year = datetype.getFullYear();
        const month = String(datetype.getMonth() + 1).padStart(2, '0');
        const day = String(datetype.getDate()).padStart(2, '0');
        const hours = String(datetype.getHours()).padStart(2, '0');
        const minutes = String(datetype.getMinutes()).padStart(2, '0');
        const seconds = String(datetype.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        formData.append('order_date', formattedDate);

        formData.append('discount_resones', discountReason);
        formData.append('table_number', tableNumber);
        formData.append('discount', discount);
        formData.append('target_customer_name', customerName);
        formData.append('target_customer_id', selectedProduct);

        formData.append('tax', 0);

        try {
            const response = await axios.post(`${API_ENDPOINT}/api/v1/orders/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-cashier-data',
                    Authorization: `Bearer ${Token}`
                },
            });
            console.log(response.data)
            message.success('لقد تم اضافة الاوردر بنجاح');
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
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
                            <label className="form-cashier-label" >{field.label}</label>
                            <select
                                className='form-cashier-select'
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                required={field.required}>
                                <option value="" disabled selected>{field.placeholder}</option>
                                {field.options.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {errors.selectedProduct && <span className="error cashier-input-error">{errors.selectedProduct}</span>}
                        </div>
                    ))}

                </div>
            </div>

            <div className="form-cashier-details-parent">
                <div>
                    <label className='form-cashier-label'>اسم الكاشير:</label>
                    <input className="form-cashier-input" type="text" disabled={true} style={{ cursor: "not-allowed" }} value={CashierName} onChange={(e) => setCahierName(e.target.value)} />
                </div>
                <div>
                    <label className='form-cashier-label'> رقم التربيزة:</label>
                    <input className="form-cashier-input" type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} onWheel={event => event.currentTarget.blur()} />
                    {errors.tableNumber && <span className="error cashier-input-error ">{errors.tableNumber}</span>}
                </div>
                <div>
                    <label className='form-cashier-label'>اسم العميل:</label>
                    <input className="form-cashier-input" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    {errors.customerName && <span className="error cashier-input-error">{errors.customerName}</span>}
                </div>
                <div>
                    <label className='form-cashier-label'> نسبة الخصم:</label>
                    <input className="form-cashier-input" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} onWheel={event => event.currentTarget.blur()} />
                    {errors.discount && <span className="error cashier-input-error">{errors.discount}</span>}
                </div>
                <div>
                    <label className='form-cashier-label'>سبب الخصم:</label>
                    <input className="form-cashier-input" type="text" value={discountReason} onChange={(e) => setDiscontReason(e.target.value)} />
                    {errors.discountReason && <span className="error cashier-input-error">{errors.discountReason}</span>}
                </div>
            </div>
            <CashierOrderDetailes onAddItem={handleAddItem} />
            <CashierItemList items={items} onDeleteItem={handleDeleteItem} />
            <TotalAmount total={calculateTotalAmount()} />
            <button className='form-cashier-btn' onClick={handleSubmit}>حفظ البيانات</button>
        </div>
    );
};

export default AddCashierOrder;

