import React, { Component } from "react";
import {
  Tab,
  Col,
  Row,
  Nav,
  Table,
  Button,
  Container,
  Spinner,
} from "react-bootstrap";
import Navigation from "../NavBar/NavBar";
import { withRouter } from "react-router-dom";
import Statistics from "../Statistics/Statistics";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { formatString } from "../../utils";
import "./Groups.css";

class Groups extends Component {
  state = {
    data: undefined,
    attributesType: undefined,
    subsetSelected: undefined,
    subsets: {},
    groups: {},
    subsets_colors: [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "light",
    ],
    selectedAttributes: [],
    spinner: false,
  };

  componentWillMount() {
    let d = this.props.location.state.data;
    let attributesType = this.props.location.state.attributesType;
    let subsets = this.props.location.state.subsets;
    this.setState({
      data: d,
      attributesType: attributesType,
      subsets: subsets,
      selectedAttributes: [Object.keys(attributesType)[0]],
    });
  }

  componentDidMount() {
    let method = this.props.location.state.method;
    this.setState({ spinner: true });
    fetch("https://apikgrupos.herokuapp.com/groups", {
      method: "POST",
      body: JSON.stringify({
        subset: this.state.subsets,
        types: this.state.attributesType,
        method: method,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        let g = JSON.parse(response);
        this.setState({
          groups: g,
          spinner: false,
        });
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
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

  handleSelectAttributes = e => {
    this.setState({ selectedAttributes: e });
  };

  render() {
    return (
      <Container style={{ margin: "3%" }}>
        <Row className="mb-3">
          <Col>
            <Navigation
              items={this.state.groups}
              attributesType={this.state.attributesType}
              data={this.state.data}
              onClick={this.handleSelectSubset}
            />
          </Col>
        </Row>
        {this.state.spinner && (
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
              <Spinner variant="primary" animation="border" />
            </Col>
          </Row>
        )}
        {this.state.subsetSelected === undefined && (
          <Tab.Container id="list-group-tabs-example" defaultActiveKey={1}>
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
              <Col className="tab" md={5}>
                <Tab.Content>
                  {Object.keys(this.state.groups).map(t =>
                    Object.keys(this.state.groups[t]).map(x => (
                      <Tab.Pane eventKey={x}>
                        <Table bordered striped hover>
                          <thead>
                            {this.state.selectedAttributes.map(z => (
                              <th>{z}</th>
                            ))}
                          </thead>
                          <tbody>
                            {this.state.groups[t][x].map(y => (
                              <tr>
                                {this.state.selectedAttributes.map(w => (
                                  <td>
                                    {typeof this.state.data[w][y] === "string"
                                      ? formatString(this.state.data[w][y])
                                      : this.state.data[w][y]}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Tab.Pane>
                    ))
                  )}
                </Tab.Content>
              </Col>
              <Col md={3}>
                <Row>
                  <Col>
                    <h6>Seleccione los atributos que quiere visualizar</h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <DropdownMultiselect
                      className="selectionBox"
                      selected={this.state.selectedAttributes}
                      placeholder="Seleccione los atributos a visualizar..."
                      handleOnChange={this.handleSelectAttributes}
                      options={Object.keys(this.state.data)}
                      name="attributes"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-3 mb-5">
              <Col className="d-flex align-items-end justify-content-end">
                <Button onClick={this.handleAccept}>Aceptar</Button>
              </Col>
            </Row>
          </Tab.Container>
        )}
        {this.state.subsetSelected !== undefined && (
          <Container>
            <Row>
              <Col className="d-flex align-items-center justify-content-center">
                <h3>Estadísticas</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Statistics
                  data={this.state.data}
                  attributesType={this.state.attributesType}
                  subset={this.state.subsets[this.state.subsetSelected]}
                  groups={this.state.groups[this.state.subsetSelected]}
                />
              </Col>
              <Row className="mt-3">
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
