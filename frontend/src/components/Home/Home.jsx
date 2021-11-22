import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
class Home extends Component {
  handleClickStart = () => {
    this.props.history.push({ pathname: "/data" });
  };
  render() {
    return (
      <Container style={{ height: "50%" }}>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <Button
              onClick={this.handleClickStart}
              style={{ width: "40%" }}
              variant="dark"
            >
              Empezar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-end justify-content-end">
            <Button size="lg" variant="outline-secondary">
              <BsFillQuestionCircleFill />
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
