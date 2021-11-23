import React, { Component } from "react";
import {
  Table,
  Row,
  Col,
  Form,
  Toast,
  Button,
  Container,
} from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { withRouter } from "react-router-dom";

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
    attributesType: {},
    attrTypeIncomplete: false,
    numberOfAttributesToBig: false,
  };

  componentWillMount() {
    let attr = Object.keys(this.state.data);
    let attrType = {};
    attr.map(x => (attrType[x] = ""));
    let showedAttr =
      attr.length < 5 ? attr.splice(0, attr.length - 1) : attr.splice(0, 5);
    this.setState({ showedAttributes: showedAttr, attributesType: attrType });
  }

  transformData = function (data) {
    let m = [];
    let showedAttr = Object.entries(data).filter(x =>
      this.state.showedAttributes.includes(x[0])
    );
    showedAttr.map(x => m.push(x[1]));
    return m[0].map((_, colIndex) => m.map(row => row[colIndex]));
  };

  handleSelectAttributes = e => {
    if (e.length === 0) {
      let temp = [this.state.showedAttributes[0]];
      this.setState({
        showedAttributes: temp,
        numberOfAttributesToBig: false,
      });
    } else if (e.length > 5) {
      this.setState({ numberOfAttributesToBig: true });
    } else {
      this.setState({ showedAttributes: e, numberOfAttributesToBig: false });
    }
  };

  handleFileUpload = function (e) {
    e.preventDefault();
    console.log(e.target.files);
  };

  closeToast = function (e) {
    this.setState({
      numberOfAttributesToBig: false,
    });
  }.bind(this);

  handleClickContinue = () => {
    if (Object.values(this.state.attributesType).includes("")) {
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
            <Container className="mt-5">
              <h6>Seleccione el tipo de atributo en cada caso</h6>
              {Object.keys(this.state.data).map(x => (
                <Row className="mt-2">
                  <p>{x}: </p>
                  <Form>
                    <Form.Select
                      onChange={this.handleTypeAttributes}
                      id={x}
                      aria-label="attribute type"
                    >
                      <option></option>
                      <option value="1">Nominal</option>
                      <option value="2">Numérico</option>
                    </Form.Select>
                  </Form>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
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
              <Button className="mt-5" onClick={this.handleClickContinue}>
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
