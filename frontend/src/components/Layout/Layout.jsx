import React from "react";
import { Container } from "react-bootstrap";

const layout = props => {
  return (
    <Container
      style={{
        padding: "0px",
        margin: "0px",
        maxWidth: "inherit",
      }}
    >
      <main>{props.children}</main>
    </Container>
  );
};
export default layout;
