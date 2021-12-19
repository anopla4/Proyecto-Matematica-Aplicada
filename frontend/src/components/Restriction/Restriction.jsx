import React, { Component } from "react";
import { Col, Row, Form, FloatingLabel } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import "./Restriction.css";

class Restriction extends Component {
  render() {
    return (
      <Row className="mt-2">
        <Col className="d-flex align-items-center justify-content-center">
          {this.props.attribute}
        </Col>
        {this.props.type === "Numérico" && (
          <Col>
            <Form>
              <Row>
                <Col md={4}>
                  <FloatingLabel label={"<="}>
                    <Form.Control
                      onChange={e =>
                        this.props.handleMinBound(e, this.props.attribute)
                      }
                      type="number"
                    />
                  </FloatingLabel>
                </Col>
                <Col
                  className="d-flex align-items-center justify-content-center"
                  md={4}
                >
                  {" x "}
                </Col>
                <Col md={4}>
                  <FloatingLabel label={"<="}>
                    <Form.Control
                      onChange={e =>
                        this.props.handleMaxBound(e, this.props.attribute)
                      }
                      type="number"
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </Form>
          </Col>
        )}
        {this.props.type === "Nominal" && (
          <Col>
            <DropdownMultiselect
              handleOnChange={e =>
                this.props.handleSelectValues(e, this.props.attribute)
              }
              options={this.props.values}
              name="values"
            />
          </Col>
        )}
      </Row>
    );
  }
}

export default Restriction;
