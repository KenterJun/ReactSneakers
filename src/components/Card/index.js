import React from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../../context";

import styles from "./Card.module.scss";

function Card({
  imageUrl,
  title,
  price,
  onClickPlus,
  onFavorite,
  favorited = false,
  id,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, imageUrl, title, price };

  const onPlus = () => {
    onClickPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={200}
          viewBox="0 0 150 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="101" y="110" rx="0" ry="0" width="1" height="2" />
          <rect x="129" y="69" rx="0" ry="0" width="0" height="1" />
          <rect x="132" y="76" rx="0" ry="0" width="1" height="1" />
          <rect x="0" y="0" rx="6" ry="6" width="150" height="90" />
          <rect x="0" y="102" rx="6" ry="6" width="150" height="15" />
          <rect x="0" y="131" rx="6" ry="6" width="100" height="15" />
          <rect x="0" y="171" rx="6" ry="6" width="80" height="25" />
          <rect x="118" y="168" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <button className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={
                  isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt={isFavorite ? "heartLiked" : "heartUnliked"}
              />
            </button>
          )}
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

            {onClickPlus && (
              <img
                className={styles.plus}
                onClick={onPlus}
                src={
                  isItemAdded(id)
                    ? "/img/btn-checked.svg"
                    : "/img/btn-unchecked.svg"
                }
                alt={isItemAdded(id) ? "plus" : "minus"}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
