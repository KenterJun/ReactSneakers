import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemove, opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderCompelete, setIsOrderCompelete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onCLickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://62ad76fa402135c7acc113dc.mockapi.io/orders",
        { items: cartItems },
      );

      setOrderId(data.id);
      setIsOrderCompelete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://62ad76fa402135c7acc113dc.mockapi.io/Card/" + item.id,
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <img
            onClick={onClose}
            className="removeBtn"
            src="/img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        {items.length > 0 ? (
          <div className="items-wrapper">
            <div className="items">
              {items.map((obj, index) => (
                <div className="cartItem" key={index}>
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="cartContent">
                    <p>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог:</span>
                  <div></div>
                  <b>{Math.floor(totalPrice - totalPrice * 0.95)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className="greenButton"
                onClick={onCLickOrder}>
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderCompelete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderCompelete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы пару кроссовок, чтобы сделать заказ"
            }
            image={
              isOrderCompelete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}

        {/* <div className="cartItem">
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
              className="cartItemImg"></div>
            <div className="cartContent">
              <p>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
          </div> */}
      </div>
    </div>
  );
}

export default Drawer;
