import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";

class Navigation extends Component {
  state = { numSubset: [1, 2, 3] };

  render() {
    return (
      <Navbar expand={false}>
        <Container style={{ paddingLeft: "100%" }} fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            scroll={true}
            backdrop={true}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Elija el subconjunto para consultar sus estadísticas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {this.state.numSubset.map(x => (
                  <Nav.Link href="/statistics">Subconjunto {x}</Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
