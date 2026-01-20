import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";
import { UIContext } from "../contexts/UIContext";

export default function Cart() {
  const { items, addItem, deleteItem } = useContext(CartContext);

  const { uiProgress, hideCart, showCheckout } = useContext(UIContext);

  // We calculate the total price of all items in the basket
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    // Modal only opens when uiProgress === "cart"
    <Modal open={uiProgress === "cart"}>
      <h2>Sepetiniz</h2>
      {/* If there are no items in the cart */}
      {items.length === 0 ? (
        <div className="alert alert-danger">Sepetinizde ürün yok.</div>
      ) : (
        // Show items in a list if there are items in the cart
        <ul className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => addItem(item)}
              onDecrease={() => deleteItem(item.id)}
            />
          ))}
        </ul>
      )}

      <div className="cart-summary">
        <div className="modal-actions text-end">
          {/* Close cart button */}
          <button
            onClick={() => hideCart()}
            className="btn btn-sm btn-danger me-2"
          >
            Kapat
          </button>
          {/* Show order button if there are items in the cart */}
          {items.length > 0 && (
            <button
              onClick={() => showCheckout()}
              className="btn btn-sm btn-outline-success"
            >
              Sipariş Ver
            </button>
          )}
        </div>
        {/* The total amount will only be shown if there are items in the cart */}
        {items.length > 0 && (
          <p className="badge text-bg-success mb-0 fs-5">{cartTotal} ₺</p>
        )}
      </div>
    </Modal>
  );
}