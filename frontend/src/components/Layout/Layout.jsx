import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const layout = props => {
  return (
    <Container
      style={{
        padding: "0px",
        margin: "0px",
        maxWidth: "inherit",
        maxHeight: "inherit",
      }}
    >
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">KGrupos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav className="mr-auto">
              <Nav.Link href="/data">Comenzar</Nav.Link>
              <Nav.Link href="/guide">Guía</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
        style={{
          padding: "0px",
          margin: "0px",
          paddingTop: "40px",
          maxWidth: "inherit",
        }}
      >
        <main>{props.children}</main>
      </Container>
    </Container>
  );
};
export default layout;
