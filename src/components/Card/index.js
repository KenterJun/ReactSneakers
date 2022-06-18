import React from "react";
import styles from "./Card.module.scss";

function Card({ imageUrl, title, price, onClickPlus, onFavorite }) {
  const [isAdded, setIsAdded] = React.useState(false);

  const onPlus = () => {
    onClickPlus({ imageUrl, title, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <button className={styles.favorite} onClick={onFavorite}>
        <img src="/img/heart-unliked.svg" alt="heart-unliked" />
      </button>
      <img
        className={styles.img}
        width={133}
        height={112}
        src={imageUrl}
        alt="sneakers"
      />
      <h5>{title}</h5>
      <div className={styles.cardBottom}>
        <div className={styles.cardContent}>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>

        <img
          className={styles.plus}
          onClick={onPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-unchecked.svg"}
          alt="plus"
        />
      </div>
    </div>
  );
}

export default Card;
