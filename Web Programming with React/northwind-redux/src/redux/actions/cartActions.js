import * as actionTypes from "./actionTypes";

export function addToCart(carItem) {
    return { type: actionTypes.ADD_TO_CART, payload: carItem };
}

export function removeFromCart(product) {
    return { type: actionTypes.REMOVE_FROM_CART, payload: product };
}