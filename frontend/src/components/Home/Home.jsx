import React, { Component } from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import "./Home.css";

class Home extends Component {
  handleClickStart = () => {
    this.props.history.push({ pathname: "/data" });
  };
  render() {
    return (
      <Card>
        <Card.ImgOverlay className="bg">
          <Container style={{ width: "100%", height: "100%" }}>
            <Row className="mr-0 ml-0" style={{ width: "100%", height: "50%" }}>
              <Col className="d-flex align-items-end justify-content-center">
                <Button
                  onClick={this.handleClickStart}
                  style={{
                    width: "20%",
                    height: "20%",
                    fontSize: "x-large",
                  }}
                  variant="dark"
                >
                  Empezar
                </Button>
              </Col>
            </Row>
            <Row style={{ width: "100%", height: "50%" }}>
              <Col className="d-flex align-items-end justify-content-end">
                <Button
                  style={{ width: "10%", height: "20%" }}
                  size="lg"
                  variant="link"
                >
                  <BsFillQuestionCircleFill
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.ImgOverlay>
      </Card>
    );
  }
}

export default Home;
