import React, { Component } from "react";
import { Tab, Col, Row, Nav, Table, Button, Container } from "react-bootstrap";
import Navigation from "../NavBar/NavBar";
import { withRouter } from "react-router-dom";
import Statistics from "../Statistics/Statistics";

class Groups extends Component {
  state = {
    data: undefined,
    attributesType: undefined,
    subsetSelected: undefined,
    groups: {},
    subsets_colors: [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "light",
    ],
  };

  componentDidMount() {
    let d = this.props.location.state.data;
    let attributesType = this.props.location.state.attributesType;
    let subsets = this.props.location.state.subsets;

    fetch("https://ourapigroups.herokuapp.com/groups", {
      method: "POST",
      body: JSON.stringify({ subset: subsets, types: attributesType }),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        this.setState({ groups: JSON.parse(response) });
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });

    this.setState({ data: d, attributesType: attributesType });
  }

  handleAccept = () => {
    this.props.history.push({ pathname: "/" });
  };

  handleSelectSubset = x => {
    this.setState({ subsetSelected: x });
  };

  handleGoBack = () => {
    this.setState({ subsetSelected: undefined });
  };

  render() {
    return (
      <Container style={{ margin: "3%" }}>
        {this.state.subsetSelected === undefined && (
          <Tab.Container id="list-group-tabs-example" defaultActiveKey={1}>
            <Row>
              <Navigation
                items={this.state.groups}
                attributesType={this.state.attributesType}
                data={this.state.data}
                onClick={this.handleSelectSubset}
              />
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
                            Grupo {parseInt(x) + 1}
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
                            {this.state.groups[t][x].map(y => (
                              <tr>
                                <td>{this.state.data.Nombre[y]}</td>
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
        )}
        {this.state.subsetSelected !== undefined && (
          <Container>
            <Row>
              <Col>
                <Statistics
                  data={this.state.data}
                  attributesType={this.state.attributesType}
                  groups={this.state.groups[this.state.subsetSelected]}
                />
              </Col>
              <Row>
                <Col className="d-flex align-items-end justify-content-end">
                  <Button variant="secondary" onClick={this.handleGoBack}>
                    Volver
                  </Button>
                </Col>
              </Row>
            </Row>
          </Container>
        )}
      </Container>
    );
  }
}

export default withRouter(Groups);
