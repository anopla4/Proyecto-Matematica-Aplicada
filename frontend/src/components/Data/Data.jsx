import React, { Component } from "react";
import { Table, Row, Col, Form, Toast } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
class Data extends Component {
  state = {
    data: {
      Nombre: ["Alejandro", "Ana Paula"],
      Sexo: ["Masculino", "Femenino"],
      Fuente: ["Pre-universitario", "Pre-universitario"],
      Índice: [89, 99.81],
      Organización: ["Ninguna", "Ninguna"],
      Provincia: ["La Habana", "La Habana"],
    },
    showedAttributes: [],
    numberOfAttributesToBig: false,
  };

  componentWillMount() {
    let attr = Object.keys(this.state.data);
    let showedAttr =
      attr.length < 5 ? attr.splice(0, attr.length - 1) : attr.splice(0, 5);
    this.setState({ showedAttributes: showedAttr });
  }

  transformData = function (data) {
    let m = [];
    let showedAttr = Object.entries(data).filter(x =>
      this.state.showedAttributes.includes(x[0])
    );
    showedAttr.map(x => m.push(x[1]));
    return m[0].map((_, colIndex) => m.map(row => row[colIndex]));
  };

  handleSelectAttributes = function (e) {
    if (e.length > 5) {
      this.setState({ numberOfAttributesToBig: true });
    } else {
      this.setState({ showedAttributes: e, numberOfAttributesToBig: false });
    }
  }.bind(this);

  handleFileUpload = function (e) {
    e.preventDefault();
    console.log(e.target.files);
  };

  closeToast = function (e) {
    this.setState({
      numberOfAttributesToBig: false,
    });
  }.bind(this);

  render() {
    return (
      <Row>
        <Row>
          <Form.Group
            style={{ width: "30%" }}
            controlId="formFile"
            className="mb-3 mt-3"
          >
            <Form.Control onChange={this.handleFileUpload} type="file" />
          </Form.Group>
        </Row>

        <Row>
          <Col>
            <Table bordered striped hover className="mt-5">
              <thead>
                {Object.keys(this.state.data)
                  .filter(x => this.state.showedAttributes.includes(x))
                  .map(x => (
                    <th>{x}</th>
                  ))}
              </thead>
              <tbody>
                {this.transformData(this.state.data).map(x => (
                  <tr>
                    {x.map(y => (
                      <td>{y}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={3}>
            {this.state.numberOfAttributesToBig && (
              <Toast onClose={this.closeToast}>
                <Toast.Header>
                  <strong className="me-auto">¡Atención!</strong>
                </Toast.Header>
                <Toast.Body>
                  Para visibilizar bien la información solo se mostrarán cinco
                  propiedades como máximo.
                </Toast.Body>
              </Toast>
            )}
            <DropdownMultiselect
              handleOnChange={this.handleSelectAttributes}
              selected={this.state.showedAttributes}
              options={Object.keys(this.state.data)}
              name="attributes"
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export default Data;
