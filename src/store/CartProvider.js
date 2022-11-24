import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const excistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const excistingCartItem = state.items[excistingCartItemIndex];
    let updatedItems;

    if (excistingCartItem) {
      const updatedItem = {
        ...excistingCartItem,
        amount: excistingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[excistingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    let updatedItems;
    const excistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const excistingCartItem = state.items[excistingCartItemIndex];
    if (state.items[excistingCartItemIndex].amount === 1) {
      updatedItems = [...state.items];
      updatedItems.splice(excistingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...excistingCartItem,
        amount: excistingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[excistingCartItemIndex] = updatedItem;
    }
    const updatedTotalAmount = state.totalAmount - excistingCartItem.price;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
