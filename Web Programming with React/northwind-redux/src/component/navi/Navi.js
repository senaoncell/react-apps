import { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import CartSummary from "../cart/CartSummary";

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" expand="md" light>
          <NavbarBrand tag={Link} to="/">
            Northwind Mağazası
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/saveproduct">
                  Ürün Ekle
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com">GitHub</NavLink>
              </NavItem>
              <CartSummary></CartSummary>
            </Nav>
            <NavbarText>reactstrap</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
