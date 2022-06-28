import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isReady, setIsReady] = React.useState(true);

  React.useEffect(() => {
    // fetch("https://62ad76fa402135c7acc113dc.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });

    async function fetchData() {
      try {
        const [cartResponce, favoritesResponce, itemsResponce] =
          await Promise.all([
            axios.get("https://62ad76fa402135c7acc113dc.mockapi.io/Card"),
            axios.get("https://62ad76fa402135c7acc113dc.mockapi.io/favorites"),
            axios.get("https://62ad76fa402135c7acc113dc.mockapi.io/items"),
          ]);
        // const cartResponce = await axios.get(
        //   "https://62ad76fa402135c7acc113dc.mockapi.io/Card",
        // );
        // const favoritesResponce = await axios.get(
        //   "https://62ad76fa402135c7acc113dc.mockapi.io/favorites",
        // );
        // const itemsResponce = await axios.get(
        //   "https://62ad76fa402135c7acc113dc.mockapi.io/items",
        // );

        setIsReady(false);
        setCartItems(cartResponce.data);
        setFavorites(favoritesResponce.data);
        setItems(itemsResponce.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id),
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
        );
        await axios.delete(
          `https://62ad76fa402135c7acc113dc.mockapi.io/Card/${findItem.id}`,
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://62ad76fa402135c7acc113dc.mockapi.io/Card",
          obj,
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert("Ошибка при запросе данных");
      console.log(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id)),
      );
      await axios.delete(
        `https://62ad76fa402135c7acc113dc.mockapi.io/Card/${id}`,
      );
    } catch (error) {
      alert("Ошибка при запросе данных");
      console.log(error);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://62ad76fa402135c7acc113dc.mockapi.io/favorites/${obj.id}`,
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id)),
        );
      } else {
        const { data } = await axios.post(
          "https://62ad76fa402135c7acc113dc.mockapi.io/favorites",
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart,
      }}>
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                clearInput={clearInput}
                isLoading={isReady}
              />
            }
          />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
