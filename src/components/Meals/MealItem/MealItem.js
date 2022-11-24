import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addCartHandler = (enteredAmount) => {
    console.log("add cart handler called");
    const cartItem = {
      name: props.name,
      price: props.price,
      amount: enteredAmount,
      id: props.id,
    };
    cartCtx.addItem(cartItem);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
