import React, { Component } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Overlay from "react-overlay-component";

class AdvancedOptions extends Component {
  render() {
    return (
      <Overlay
        configs={this.props.configs}
        isOpen={this.props.show}
        closeOverlay={this.props.handleCloseOverlayAdvancedOptions}
      >
        <Row>
          <Col>
            <h4>
              Elija el método que quiere utilizar para la conformación de los
              grupos
            </h4>
          </Col>
        </Row>
        <Row>
          <Form>
            <Form.Check
              onClick={() => this.props.handleChangeMethod("kmean")}
              defaultChecked={this.props.method === "kmean"}
              type="radio"
              id="kmean"
              label="K-means"
              name="K-means"
            />
            <Form.Check
              onClick={() => this.props.handleChangeMethod("kmean")}
              checked={this.props.method === "methauristic"}
              type="radio"
              id="metaheuristic"
              label="Metaheurística"
              name="Metaheurística"
            />
          </Form>
        </Row>
      </Overlay>
    );
  }
}

export default AdvancedOptions;
