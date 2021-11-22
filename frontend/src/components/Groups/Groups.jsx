import React, { Component } from "react";
import { Tab, Col, Row, Nav, Table, Button } from "react-bootstrap";
import Navigation from "../NavBar/NavBar";

class Groups extends Component {
  state = {
    groups: {
      1: {
        1: {
          Nombre: ["Alejandro", "Ana Paula"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
        2: {
          Nombre: ["Alejandro", "Gabriela"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
        3: {
          Nombre: ["Alejandro", "Ana Paula"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
      },
      2: {
        4: {
          Nombre: ["Alejandro", "Ana Paula"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
        5: {
          Nombre: ["Alejandro", "Gabriela"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
        6: {
          Nombre: ["Alejandro", "Ana Paula"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
      },
      3: {
        7: {
          Nombre: ["Alejandro", "Ana Paula"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
        8: {
          Nombre: ["Alejandro", "Gabriela"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
        9: {
          Nombre: ["Alejandro", "Ana Paula"],
          Sexo: ["Masculino", "Femenino"],
          Fuente: ["Pre-universitario", "Pre-universitario"],
          Índice: [89, 99.81],
          Organización: ["Ninguna", "Ninguna"],
          Provincia: ["La Habana", "La Habana"],
        },
      },
    },
    subsets_colors: [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "light",
    ],
  };

  handleAccept = () => {
    this.props.history.push({ pathname: "/" });
  };

  render() {
    return (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey={1}>
        <Row>
          <Navigation />
        </Row>
        <Row>
          <Col md={3}>
            <Nav className="flex-column">
              {Object.keys(this.state.groups).map(t =>
                Object.keys(this.state.groups[t]).map(x => (
                  <Nav.Item>
                    <Nav.Link eventKey={x}>
                      <Button
                        style={{ width: "100%" }}
                        variant={
                          this.state.subsets_colors[
                            t % this.state.subsets_colors.length
                          ]
                        }
                      >
                        Grupo {x}
                      </Button>
                    </Nav.Link>
                  </Nav.Item>
                ))
              )}
            </Nav>
          </Col>
          <Col md={1}></Col>
          <Col md={5}>
            <Tab.Content>
              {Object.keys(this.state.groups).map(t =>
                Object.keys(this.state.groups[t]).map(x => (
                  <Tab.Pane eventKey={x}>
                    <Table bordered striped hover>
                      <thead>
                        <th>Nombre</th>
                      </thead>
                      <tbody>
                        {this.state.groups[t][x].Nombre.map(y => (
                          <tr>
                            <td>{y}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                ))
              )}
            </Tab.Content>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-end justify-content-end">
            <Button onClick={this.handleAccept}>Aceptar</Button>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default Groups;
