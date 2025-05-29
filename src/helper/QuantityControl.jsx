import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import { useChangeQuantityByIdMutation } from "../services/cartApi";

const QuantityControl = ({ initialQuantity = 1, cartId, productId, unitId, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const { updateQuantity } = useContext(CartContext);
    var [changeQuantityfn]=useChangeQuantityByIdMutation()
    const customerId = window.localStorage.getItem('customer_id');
    const isLoggedIn = !!customerId;
    useEffect(() => { 
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const update = async(newQuantity) => {
        setQuantity(newQuantity);
        if(isLoggedIn)
        {
            try {
                await changeQuantityfn({
                    cartId,
                    newQuantity
                }).unwrap(); // Optional: handle API success/failure
            } catch (error) {
                console.error("Failed to update quantity in DB", error);
            }
            updateQuantity(productId, unitId, newQuantity);
        }
        else
            updateQuantity(productId, unitId, newQuantity);

        // 👇 Inform parent (CartSection) to re-fetch or re-render
        if (onQuantityChange) {
            onQuantityChange(productId, unitId, newQuantity);
        }
    };

    const incrementQuantity = () => update(quantity + 1);
    const decrementQuantity = () => update(quantity > 1 ? quantity - 1 : 1);

    return (
        <div className="d-flex rounded-4 overflow-hidden">
            <button type="button" onClick={decrementQuantity} className="quantity__minus border ...">
                <i className="ph ph-minus" />
            </button>
            <input
                type="number"
                className="quantity__input ..."
                value={quantity}
                min={1}
                readOnly
            />
            <button type="button" onClick={incrementQuantity} className="quantity__plus border ...">
                <i className="ph ph-plus" />
            </button>
        </div>
    );
};
 
export default QuantityControl