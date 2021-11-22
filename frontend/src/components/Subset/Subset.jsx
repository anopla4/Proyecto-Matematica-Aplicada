import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";

class Subset extends Component {
  state = { numberOfGroups: 3, students: [], attributes: [], restrictions: [] };

  handleGenerateGroups = () => {
    this.props.history.push({ pathname: "/groups" });
  };

  render() {
    return (
      <Row>
        <Row>
          <Col className="d-flex align-items-end justify-content-end">
            <Button onClick={this.handleGenerateGroups}>Generar grupos</Button>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default Subset;
