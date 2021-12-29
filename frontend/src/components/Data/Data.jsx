import React, { Component } from "react";
import { Table, Row, Col, Form, Toast, Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { transformData } from "../../utils";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import "./Data.css";

class Data extends Component {
  state = {
    data: undefined,
    attributesType: {},
    attrTypeIncomplete: false,
    numberOfAttributesToBig: false,
    spinner: false,
    attributesSelected: [],
  };

  handleFileUpload = e => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", e.target.files[0], e.target.files[0].name);
    this.setState({ spinner: true });
    fetch("https://ourapigroups.herokuapp.com/file", {
      method: "POST",
      body: formdata,
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        response = JSON.parse(response);
        let attr = Object.keys(response);
        let attrType = {};
        attr.map(x =>
          typeof response[x][0] === "string"
            ? (attrType[x] = "Nominal")
            : (attrType[x] = "Numérico")
        );
        let d = {};
        Object.keys(response).map(x => (d[x] = Object.values(response[x])));
        this.setState({
          data: d,
          attributesType: attrType,
          spinner: false,
        });
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
  };

  closeToast = e => {
    this.setState({
      numberOfAttributesToBig: false,
    });
  };

  handleClickContinue = () => {
    if (this.state.data === undefined) {
      return;
    } else if (Object.values(this.state.attributesType).includes("")) {
      this.setState({ attrTypeIncomplete: true });
    } else {
      this.props.history.push({
        pathname: "/subset",
        data: {
          data: this.state.data,
          attributesType: this.state.attributesType,
        },
      });
    }
  };

  handleTypeAttributes = e => {
    let attr = e.target.id;
    let selectedType = e.target.options[e.target.selectedIndex].innerText;
    let newAttrType = this.state.attributesType;
    newAttrType[attr] = selectedType;
    this.setState({ attributesType: newAttrType });
  };

  handleAttributesSelectionType = e => {
    this.setState({ attributesSelected: e });
  };

  handleCloseToast = () => {
    this.setState({ attrTypeIncomplete: false });
  };

  render() {
    return (
      <Row style={{ margin: "3%" }}>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <h3>Cargar datos</h3>
          </Col>
        </Row>
        <Row>
          <h4>Seleccione los datos que quiere agrupar:</h4>
          <Form.Group
            style={{ width: "30%" }}
            controlId="formFile"
            className="mb-3 mt-3"
          >
            <Form.Control onChange={this.handleFileUpload} type="file" />
          </Form.Group>
        </Row>
        {this.state.spinner && (
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
              <Spinner variant="primary" animation="border" />
            </Col>
          </Row>
        )}
        <Row>
          <Col className="tabCol">
            {this.state.data !== undefined && (
              <Table bordered striped hover className="mt-5">
                <thead>
                  {Object.keys(this.state.data).map(x => (
                    <th>{x}</th>
                  ))}
                </thead>
                <tbody>
                  {transformData(this.state.data).map(x => (
                    <tr>
                      {x.map(y => (
                        <td>{y}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
        {this.state.data !== undefined && (
          <Row className="mt-5">
            <Row>
              <Col>
                <h4>Seleccione el tipo de atributo en cada caso</h4>
                <small>
                  Los atributos que tengan valores numéricos serán tratados como
                  variables cuantitativas y los que sean cadenas de caracteres,
                  como variables nominales
                </small>
              </Col>
              <Col>
                <DropdownMultiselect
                  placeholder="Seleccione los atributos para modificar su tipo..."
                  handleOnChange={this.handleAttributesSelectionType}
                  options={Object.keys(this.state.data)}
                  name="attributes"
                />
              </Col>
            </Row>
            {Array.from({
              length: Math.ceil(this.state.attributesSelected.length / 4),
            }).map((_, i) => (
              <Row className="mt-2">
                {Array.from({
                  length: Math.min(
                    this.state.attributesSelected.length - 4 * i,
                    4
                  ),
                }).map((_, j) => (
                  <Col md={3}>
                    <Form>
                      <Form.Label>
                        {this.state.attributesSelected[i * 4 + j]}:{" "}
                      </Form.Label>
                      <Form.Select
                        onChange={this.handleTypeAttributes}
                        id={this.state.attributesSelected[i * 4 + j]}
                        aria-label="attribute type"
                        defaultValue={
                          this.state.attributesType[
                            this.state.attributesSelected[i * 4 + j]
                          ] === "Nominal"
                            ? "1"
                            : "2"
                        }
                      >
                        <option></option>
                        <option value="1">Nominal</option>
                        <option value="2">Numérico</option>
                      </Form.Select>
                    </Form>
                  </Col>
                ))}
              </Row>
            ))}
            {/* {Object.keys(this.state.data).length % 4 !== 0 && (
              <Row>
                {Array.from({
                  length: Object.keys(this.state.data).length % 4,
                }).map((_, j) => (
                  <Col>
                    <p>
                      {
                        Object.keys(this.state.data)[
                          (4 * Object.keys(this.state.data).length) / 4 + j
                        ]
                      }
                      :{" "}
                    </p>
                    <Form>
                      <Form.Select
                        onChange={this.handleTypeAttributes}
                        id={
                          Object.keys(this.state.data)[
                            (4 * Object.keys(this.state.data).length) / 4 + j
                          ]
                        }
                        aria-label="attribute type"
                      >
                        <option></option>
                        <option value="1">Nominal</option>
                        <option value="2">Numérico</option>
                      </Form.Select>
                    </Form>
                  </Col>
                ))}
              </Row>
            )} */}
          </Row>
        )}
        <Row>
          <Col className="d-flex align-items-end justify-content-end">
            <Row>
              {this.state.attrTypeIncomplete && (
                <Toast className="mt-3 mb-5" onClose={this.handleCloseToast}>
                  <Toast.Header>
                    <strong className="me-auto">¡Atención!</strong>
                  </Toast.Header>
                  <Toast.Body>
                    Debe seleccionar un tipo para todos los atributos.
                  </Toast.Body>
                </Toast>
              )}
            </Row>
            <Row>
              <Button className="mt-5 mb-5" onClick={this.handleClickContinue}>
                Continuar
              </Button>
            </Row>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default withRouter(Data);
