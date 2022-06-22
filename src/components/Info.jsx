import React from "react";

import AppContext from "../context";

const Info = ({ title, description, image }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="cartEmpty">
      <img width="120px" src={image} alt="emptyCart" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
