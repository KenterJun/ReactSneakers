import React from "react";
import axios from "axios";

import Card from "../components/Card";
import AppContext from "../context";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [isReady, setIsReady] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://62ad76fa402135c7acc113dc.mockapi.io/orders",
        );
        setOrders(data.map((obj) => obj.items).flat());
        setIsReady(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="content-wrapper">
        <h1>Мои заказы</h1>
      </div>

      <div className="sneakers">
        {(isReady ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isReady} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
