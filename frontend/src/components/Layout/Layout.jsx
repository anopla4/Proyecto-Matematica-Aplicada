import React from "react";
import { Container } from "react-bootstrap";

const layout = props => {
  return (
    <Container className="mt-5">
      <main>{props.children}</main>
    </Container>
  );
};
export default layout;
