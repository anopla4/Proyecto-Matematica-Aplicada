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

    this.setState({
      data: d,
      attributesType: attributesType,
    });
  }

  componentDidMount() {
    let subsets = this.props.location.state.subsets;
    let method = this.props.location.state.method;
    this.setState({ spinner: true });
    fetch("https://apikgrupos.herokuapp.com/groups", {
      method: "POST",
      body: JSON.stringify({
        subset: subsets,
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
        this.setState({
          groups: JSON.parse(response),
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
                            {this.state.selectedAttributes.map(x => (
                              <th>{x}</th>
                            ))}
                          </thead>
                          <tbody>
                            {this.state.groups[t][x].map(y => (
                              <tr>
                                {this.state.selectedAttributes.map(x => (
                                  <td>
                                    {typeof this.state.data[x][y] === "string"
                                      ? formatString(this.state.data[x][y])
                                      : this.state.data[x][y]}
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
                <DropdownMultiselect
                  className="selectionBox"
                  style={{ width: "40%" }}
                  placeholder="Seleccione los atributos relevantes..."
                  handleOnChange={this.handleSelectAttributes}
                  options={Object.keys(this.state.data)}
                  name="attributes"
                />
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
              <Col>
                <Statistics
                  data={this.state.data}
                  attributesType={this.state.attributesType}
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
