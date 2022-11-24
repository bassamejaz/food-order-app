import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnClass, setBtnClass] = useState(classes.button);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    setBtnClass(`${classes.button} ${classes.bump}`);
    const timer = setTimeout(() => {
      setBtnClass(classes.button);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.totalAmount]);

  // const btnClass1 = `${classes.button} ${classes.bump}`;
  return (
    <button className={btnClass} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
