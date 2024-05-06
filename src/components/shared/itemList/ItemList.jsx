import { API_ENDPOINT } from "../../../../config";

const ItemList = ({ items, onDeleteItem }) => {
    return (
        <div className="item-list">
            <h2>Item List</h2>
            {items.map((item, index) => (
                <div className="item" key={index}>
                    <div>{item.name}</div>
                    <div>   <img
                        src={`${API_ENDPOINT}/${item.image}`}
                        alt={`alt-${item.name}`}
                        style={{ width: "50px", height: "40px" }}
                    /></div>
                    <div>
                        Quantity: {item.quantity}
                    </div>
                    <div>Price: ${item.price}</div>
                    <div>Expire Date: {item.expireDate}</div>
                    <button style={{ backgroundColor: "#803D3B" }} onClick={() => onDeleteItem(index)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
