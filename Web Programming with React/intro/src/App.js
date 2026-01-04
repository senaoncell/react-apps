import React,{ Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";


export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    // Filtering
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();

    let cart = localStorage.getItem("cart");
    if (cart) {
      this.setState({ cart: JSON.parse(cart) });
    }
  }

  // Filtering
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCard = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    localStorage.setItem("cart", JSON.stringify(newCart));
    alertify.success(product.productName + "  Added to Cart!", 2);
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    localStorage.setItem("cart", JSON.stringify(newCart));
    alertify.error(product.productName + "  Remove from Cart!");
  };

  render() {
    let productInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              {/*v5 <Switch> */}
              <Routes>
                <Route
                  exact
                  path="/"
                  // v5 render ={props =>(<ProductList/>)}
                  element={
                    <ProductList
                      //v5 {...props}
                      products={this.state.products}
                      addToCard={this.addToCard}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  }
                />
                <Route
                  exact
                  path="/cart"
                  //v5 render ={props =>(<CarList/>)}
                  element={
                    <CartList
                      //v5 {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  }
                />
                {/*v5 <Route path="/form1" component={FormDemo1} /> */}
                <Route path="form1" element={<FormDemo1 />} />
                {/*v5 <Route path="/form2" component={FormDemo2} /> */}
                <Route path="form2" element={<FormDemo2 />} />

                {/*v5 <Route component={NotFound} /> */}
                <Route element={<NotFound />} />
                
              </Routes> 
              {/*v5 </Switch> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
