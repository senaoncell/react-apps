export default function cartReducer(state, action) {

  // PRODUCT ADDITION PROCESS
  if (action.type == "ADD_ITEM") {
    // We get the index to find the same product in the cart
    const index = state.items.findIndex((item) => item.id === action.item.id);

    // To avoid directly modifying the State, we create a copy of the items array
    const updatedItems = [...state.items];

    // If the product is already in the cart
    if (index > -1) {
      // We are taking the current product
      const existingItem = state.items[index];

      // We are increasing the quantity of the product by 1
      const updatedItem = {
        ...existingItem, // title, quantity:2
        quantity: existingItem.quantity + 1,
      };
      
      // We are placing the updated product in the same index
      updatedItems[index] = updatedItem;
    } else {
      // If the product is not in the cart, we add it as quantity = 1.
      updatedItems.push({ ...action.item, quantity: 1 }); // title,id,price,quantity
    }

    // We are returning the new state with the updated items
    return { ...state, items: updatedItems };
  }

  // PRODUCT DISCONTINUATION (QUANTITY REDUCTION) PROCESS
  if (action.type == "REMOVE_ITEM") {
    // We find the index of the product in the cart
    const index = state.items.findIndex((item) => item.id === action.id);

    // We are taking the current product
    const existingItem = state.items[index];
    // We create a copy of the items array
    const updatedItems = [...state.items];

    // If the quantity of the product is 1, we remove it completely from the cart.
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItem, 1);
    
    } else {
      // We are reducing the quantity of the product by 1
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      // We place the updated product in the same index.
      updatedItems[index] = updatedItem;
    }
    // We are returning the updated state
    return { ...state, items: updatedItems };
  }

  // COMPLETELY CLEAN THE BASKET
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  // Return the current state if an unknown action is received.
  return state;
}