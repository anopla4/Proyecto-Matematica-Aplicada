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
import { transformData } from "../../utils";

class Data extends Component {
  state = {
    data: undefined,
    showedAttributes: [],
    attributesType: {},
    attrTypeIncomplete: false,
    numberOfAttributesToBig: false,
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

  handleFileUpload = e => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", e.target.files[0], e.target.files[0].name);
    fetch("http://127.0.0.1:8000/file", {
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
        attr.map(x => (attrType[x] = "Nominal"));
        let showedAttr =
          attr.length < 5 ? attr.splice(0, attr.length - 1) : attr.splice(0, 5);
        let d = {};
        Object.keys(response).map(x => (d[x] = Object.values(response[x])));
        this.setState({
          data: d,
          showedAttributes: showedAttr,
          attributesType: attrType,
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
            {this.state.data !== undefined && (
              <Table bordered striped hover className="mt-5">
                <thead>
                  {Object.keys(this.state.data)
                    .filter(x => this.state.showedAttributes.includes(x))
                    .map(x => (
                      <th>{x}</th>
                    ))}
                </thead>
                <tbody>
                  {transformData(
                    this.state.data,
                    this.state.showedAttributes
                  ).map(x => (
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
          {this.state.data !== undefined && (
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
          )}
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
