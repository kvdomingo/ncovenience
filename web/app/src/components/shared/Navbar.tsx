import { useState } from "react";
import {
  MDBCollapse as Collapse,
  MDBContainer,
  MDBNavItem as NavItem,
  MDBNavLink as NavLink,
  MDBNavbar as Navbar,
  MDBNavbarBrand as NavbarBrand,
  MDBNavbarNav as NavbarNav,
  MDBNavbarToggler as NavbarToggler,
} from "mdbreact";

function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    // @ts-ignore
    <Navbar dark expand="lg" className="bg-dark" style={{ boxShadow: "none" }}>
      <MDBContainer fluid>
        <NavbarBrand>
          <NavLink to="/" className="text-white">
            <span style={{ fontVariant: "small-caps" }}>ncovenience</span>: COVID-19 PH Tracker
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={() => setOpen(isOpen => !isOpen)} />
        {/*@ts-ignore*/}
        <Collapse isOpen={open} navbar>
          <NavbarNav left>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="docs">API</NavLink>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </MDBContainer>
    </Navbar>
  );
}

export default Navigation;
