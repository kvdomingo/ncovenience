import { useState } from "react";
import {
  MDBCollapse as Collapse,
  MDBNavItem as NavItem,
  MDBNavLink as NavLink,
  MDBNavbar as Navbar,
  MDBNavbarBrand as NavbarBrand,
  MDBNavbarNav as NavbarNav,
  MDBNavbarToggler as NavbarToggler,
} from "mdbreact";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar dark expand="lg" className="bg-dark" style={{ boxShadow: "none" }}>
      <NavbarBrand>
        <NavLink to="/" className="text-white">
          <span style={{ fontVariant: "small-caps" }}>ncovenience</span>: COVID-19 PH Tracker
        </NavLink>
      </NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(isOpen => !isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <NavbarNav left>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="docs">API</NavLink>
          </NavItem>
        </NavbarNav>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;
