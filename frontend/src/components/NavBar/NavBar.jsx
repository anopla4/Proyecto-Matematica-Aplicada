import React, { Component } from "react";
import "./NavBar.css";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Container, Button } from "react-bootstrap";

class Navigation extends Component {
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
                {Object.keys(this.props.items).map(x => (
                  <Button
                    variant="light"
                    id={x}
                    onClick={() => this.props.onClick(x)}
                  >
                    Subconjunto {x}
                  </Button>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);
