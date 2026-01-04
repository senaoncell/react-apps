import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product}
}

/* export function saveProductApi(product) {
    return fetch("http://localhost:3000/products/" + (product.id || ""),
        {
            method: product.id ? "PUT" : "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(product)
        }).then(handleResponse).catch(handleError)
}
 */

export function saveProductApi(product) {
    // If product.id does not exist, assign a new id.
    if (!product.id) {
        return fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(products => {
                // Convert the existing IDs into numbers and find the highest one.
                const maxId = products.reduce((max, p) => Math.max(max, parseInt(p.id)), 0);
                product.id = (maxId + 1).toString(); // Assign as string
                // Add the product now
                return fetch("http://localhost:3000/products", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(product)
                }).then(handleResponse).catch(handleError);
            });
    }

    // Update if you have an ID.
    return fetch("http://localhost:3000/products/" + product.id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product)
    }).then(handleResponse).catch(handleError);
}


export function saveProduct(product) {
    return function (dispatch) {
        return saveProductApi(product).then(savedProduct => {
            product.id ? dispatch(updateProductSuccess(savedProduct)) : dispatch(createProductSuccess(savedProduct))
        }).catch(error => {throw error})
    }
}

export async function handleResponse(response){
    if(response.ok){
        return response.json()
    }

    const error = await response.text()
    throw new Error(error)
}

export function handleError(error){
    console.error("Bir hata oluştu");
    throw error

}

//filtering
export function getProducts(categoryId) {
  return function (dispatch) {
    let url = "http://localhost:3000/products";

    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
      //url += "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}