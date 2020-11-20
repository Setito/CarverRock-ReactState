import React from "react"
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";
import { useCart } from "./cartContext";

export default function OrderConfirmation(props){
    const {cart} = useCart();
    const urls = cart.map((i) => `products/${i.id}`);
    const { data: products, loading, error } = useFetchAll(urls);

    function renderItem(itemPurchased) {
        const { id, sku, quantity } = itemPurchased;
        const { price, name, image, skus } = products.find(
            (p) => p.id === parseInt(id)
          );
        const { size } = skus.find((s) => s.sku === sku);

        return(
            <li key={sku} className="cart-item">
                <img src={`/images/${image}`} alt={name} width={'30%'} />
                <div>
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <p>Size: {size}</p>
                    <p>Units: {quantity}</p>
                </div>
            </li>
        );
    }

    if (loading) return <Spinner />;
    if (error) throw error;

    const totalCost = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return(
        <section>
            <h2>Thanks {props.name} for buying!</h2>
            <h2>This is the detail of your purchase:</h2>
            <ul>{cart.map(renderItem)}</ul>
            <h3>Total: ${totalCost}</h3>
        </section>        
    )
}