import React, { Component } from "react";
import "./CreateSubset.css";
import Overlay from "react-overlay-component";
import Restriction from "../Restriction/Restriction";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { removeRepeated } from "../../utils";
import { Col, Row, Button, Form, ListGroup } from "react-bootstrap";

class CreateSubset extends Component {
  render() {
    const configs = {
      animate: true,
      // top: `5em`,
      clickDismiss: false,
      escapeDismiss: false,
      // focusOutline: false,
    };
    return (
      <Overlay
        configs={configs}
        isOpen={this.props.show}
        closeOverlay={this.props.handleCloseOverlay}
      >
        <Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
              <h3>Configurar subconjunto</h3>
            </Col>
          </Row>
          <Row>
            <Form>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Form.Label>
                        <h6>
                          Elija la cantidad de grupos para este subconjunto
                        </h6>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.props.invalidNumberOfGroups && (
                        <Form.Label style={{ color: "red" }}>
                          Debe seleccionar una cantidad de grupos para crear el
                          subconjunto.
                        </Form.Label>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={2}>
                      <Form.Control
                        onChange={this.props.handleChangeNumberGroupsSubset}
                        min={1}
                        max={
                          this.props.numberOfGroups - this.props.groupsAssigned
                        }
                        type="number"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col>
                      <Form.Label className="mt-3">
                        <h6>
                          Elija los atributos importantes para este subconjunto
                        </h6>
                        {this.props.importantAttributeSelected && (
                          <small>Debe seleccionar al menos un atributo.</small>
                        )}
                      </Form.Label>
                      {!this.props.importantAttributeSelected && (
                        <Form.Label style={{ color: "red" }}>
                          Debe seleccionar al menos un atributo relevante para
                          este subconjunto.
                        </Form.Label>
                      )}
                      <DropdownMultiselect
                        style={{ width: "40%" }}
                        placeholder="Seleccione los atributos relevantes..."
                        handleOnChange={this.props.handleSelectAttributes}
                        options={Object.keys(this.props.data)}
                        name="attributes"
                      />
                    </Col>
                  </Row>

                  <Row className="attrImportance">
                    <Col>
                      <ListGroup className="mt-3">
                        {Object.entries(this.props.subsetAttributes).map(x => (
                          <ListGroup.Item>
                            {x[0]}{" "}
                            <Form.Range
                              id={x[0]}
                              defaultValue={x[1]}
                              min={0.1}
                              max={10}
                              onChange={this.props.handleImportanceAttribute}
                            />
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col>
                      <Form.Label className="mt-3">
                        <h6>Elija las restricciones para este subconjunto</h6>
                        <small>
                          Si no selecciona restricciones se añadirán todos los
                          estudiantes que quedan por asignar.
                        </small>
                      </Form.Label>

                      <DropdownMultiselect
                        style={{ width: "40%" }}
                        placeholder="Seleccione los atributos..."
                        handleOnChange={this.props.handleSelectRestrictions}
                        options={Object.keys(this.props.data)}
                        name="attributes"
                      />
                    </Col>
                  </Row>
                  <Row className="attrImportance">
                    <Col>
                      {Object.keys(this.props.restrictions).map((x, index) => (
                        <Restriction
                          attribute={x}
                          type={this.props.attributesType[x]}
                          handleMaxBound={e =>
                            this.props.handleMaxBound(e, index)
                          }
                          handleMinBound={e =>
                            this.props.handleMinBound(e, index)
                          }
                          handleSelectValues={e =>
                            this.props.handleSelectValues(e, index)
                          }
                          values={
                            this.props.attributesType[x] === "Nominal"
                              ? removeRepeated(this.props.data[x])
                              : []
                          }
                        />
                      ))}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Row>

          <Row>
            <Col className="d-flex align-items-end justify-content-end">
              <Button
                style={{ width: "25%" }}
                variant="primary"
                onClick={this.props.handleAcceptSubset}
                className="mt-5"
              >
                Aceptar
              </Button>
            </Col>
          </Row>
        </Row>
      </Overlay>
    );
  }
}

export default CreateSubset;
