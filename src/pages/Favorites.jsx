import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
  const { favorites, onAddToFavorite, onAddToCart } =
    React.useContext(AppContext);

  return (
    <div className="content">
      <div className="content-wrapper">
        <h1>Мои закладки</h1>
      </div>

      <div className="sneakers">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onClickPlus={(obj) => onAddToCart(obj)}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
