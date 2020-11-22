import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "./cartContext";

const activeStyle = {
  color: "purple",
};

export default function Header() {
  const {cart} = useCart();

  const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to="/shoes">
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to="/backpack">
              Backpacks
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to="/cart">
              Cart ({numItemsInCart})
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
