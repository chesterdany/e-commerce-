import React, { useState, useEffect } from "react";
// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar";
import { commerce } from "./lib/commerce";

import { Products, Navbar, Cart, Checkout } from "./components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const updateQTYHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    console.log(cart);
    setCart(cart);
  };

  const removeFromCartHandler = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const emptyCartHandler = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={addToCartHandler} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              updateQTYHandler={updateQTYHandler}
              removeFromCartHandler={removeFromCartHandler}
              emptyCartHandler={emptyCartHandler}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
