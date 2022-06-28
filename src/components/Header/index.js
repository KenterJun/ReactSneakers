import React from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link to="/">
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div className="headerInfo">
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={props.onClickCart} className="headerPrice">
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img width={20} height={20} src="/img/heart.svg" alt="heart" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={20} height={20} src="/img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
