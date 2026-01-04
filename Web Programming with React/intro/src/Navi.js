import React, { Component } from "react";
import {
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
} from "reactstrap";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";

export default class Navi extends Component {
  state = { isOpen: false };

  toggle() {
    this.setIsOpen(!this.state.isOpen);
  }

  render() {
    let isOpen = this.state.isOpen;

    return (
      <Navbar color="light" light expand={true}>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/form1">
                Form Demp 1
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" as={Link} to="/form2">
                Form Demp 2
              </Link>
            </NavItem>
            <CartSummary
              removeFromCart={this.props.removeFromCart}
              cart={this.props.cart}
            />
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    );
  }
}
