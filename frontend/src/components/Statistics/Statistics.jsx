import React, { Component } from "react";
import { Bar, Scatter } from "react-chartjs-2";
import { Row, Col, Container, Form, Table } from "react-bootstrap";
import { removeRepeated, countElements } from "../../utils";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import "./Statistics.css";

class Statistics extends Component {
  state = {
    attributes: [],
    groupType: "group",
  };

  componentDidMount() {
    this.setState({
      attributes: [this.props.subset["attributes"][0][0]],
    });
  }

  handleChangeAttribute = e => {
    this.setState({ attributes: e });
  };

  generateColor = () => {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let a = Math.random();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  transformDataBar = attr => {
    let data = {
      labels: removeRepeated(this.props.data[attr]),
      datasets: [],
    };
    let options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    Object.keys(this.props.groups).map(x => {
      let attrCounts = {};
      data.labels.map(y => (attrCounts[y] = 0));
      this.props.data[attr]
        .filter((_, i) => this.props.groups[x].includes(i))
        .map(z => (attrCounts[z] += 1));
      data.datasets.push({
        label: `Grupo ${parseInt(x) + 1}`,
        data: Object.values(attrCounts),
        backgroundColor: [this.generateColor()],
        borderColor: [this.generateColor],
        borderWidth: 1,
      });
      return 0;
    });

    return [data, options];
  };

  transformDataScatter = attr => {
    let data = {
      datasets: [],
    };
    Object.keys(this.props.groups).map(g => {
      let students = this.props.groups[g];
      let d = [];
      students.map(s => d.push({ x: this.props.data[attr][s], y: g }));

      data.datasets.push({
        label: `Grupo ${parseInt(g) + 1}`,
        data: d,
        backgroundColor: [this.generateColor()],
      });

      return 0;
    });
    let options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return [data, options];
  };

  handleGroupTable = e => {
    this.setState({ groupType: e.target.value });
  };

  render() {
    return (
      <Row>
        <Row className="mb-3">
          <Col></Col>
          <Col md={3} className="d-flex align-items-end justify-content-end">
            <Form>
              <Form.Label>
                Seleccione los atributos de los que quiere ver las estadísticas
              </Form.Label>
              <DropdownMultiselect
                selected={this.state.attributes}
                placeholder="Seleccione los atributos..."
                handleOnChange={this.handleChangeAttribute}
                options={this.props.subset["attributes"].map(x => x[0])}
                name="attributes"
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col
            md={6}
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "2px",
            }}
          >
            <Row className="mt-3">
              <Col className="d-flex align-items-center justify-content-center">
                <h4>Tablas</h4>
              </Col>
            </Row>
            <Row>
              <Form>
                <Form.Label>Agrupar tablas por:</Form.Label>
                <Form.Select
                  onChange={this.handleGroupTable}
                  aria-label="tables grouped by type"
                  defaultValue="group"
                >
                  <option></option>
                  <option value="group">Grupo</option>
                  <option value="attribute">Atributo</option>
                </Form.Select>
              </Form>
            </Row>
            {this.state.attributes.map(x => (
              <div className="mt-3">
                <Row style={{ maxHeight: "80vh" }}>
                  <Col>
                    git status
                    <h6>
                      {x} (Importancia:{" "}
                      {this.props.subset["attributes"].find(y => y[0] === x)[1]}
                      )
                    </h6>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="d-flex align-items-center justify-content-center tabCol">
                    <Table variant="secondary" bordered striped hover>
                      <thead>
                        <th>Frecuencias</th>
                        {Object.keys(this.props.groups).map(x => (
                          <th>{parseInt(x) + 1}</th>
                        ))}
                      </thead>
                      <tbody>
                        {removeRepeated(this.props.data[x]).map(y => (
                          <tr>
                            <td>{y}</td>
                            {Object.keys(this.props.groups).map(z => (
                              <td>
                                {countElements(
                                  this.props.groups[z],
                                  y,
                                  x,
                                  this.props.data
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
          <Col
            md={6}
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "2px",
            }}
          >
            <Row className="mt-3">
              <Col className="d-flex align-items-center justify-content-center">
                <h4>Gráficos</h4>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                {this.state.attributes.map(x => (
                  <div className="mt-3">
                    <Row>
                      <Col className="d-flex align-items-center justify-content-center">
                        <h4>{x}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {this.props.attributesType[x] === "Nominal" && (
                          <Container style={{ width: "100%" }}>
                            <Bar
                              data={this.transformDataBar(x)[0]}
                              options={this.transformDataBar(x)[1]}
                            />
                          </Container>
                        )}
                        {this.props.attributesType[x] === "Numérico" && (
                          <Container style={{ width: "100%" }}>
                            <Scatter
                              data={this.transformDataScatter(x)[0]}
                              options={this.transformDataScatter(x)[1]}
                            />
                          </Container>
                        )}
                      </Col>
                    </Row>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default Statistics;
