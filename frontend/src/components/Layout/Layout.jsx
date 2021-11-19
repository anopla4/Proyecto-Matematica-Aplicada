import React from "react";
import { Container, Row } from "react-bootstrap";
import Navigation from "../NavBar/NavBar";

const layout = props => {
  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <main>{props.children}</main>
    </Container>
  );
};
export default layout;
