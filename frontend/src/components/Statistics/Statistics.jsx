import React, { Component } from "react";
import { Bar, Scatter } from "react-chartjs-2";
import { Row, Col, Container, Form } from "react-bootstrap";

class Statistics extends Component {
  state = {
    type: "",
    attribute: "",
  };

  handleChangeAttribute = e => {
    let attr = e.target.value;
    let type = attr === "" ? "" : this.props.attributesType[attr];
    this.setState({ attribute: attr, type: type });
  };

  generateColor = () => {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let a = Math.random();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  transformDataBar = () => {
    let data = {
      labels: this.props.data[this.state.attribute].filter(function (
        elem,
        index,
        self
      ) {
        return index === self.indexOf(elem);
      }),
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
      this.props.data[this.state.attribute].map(z => attrCounts[z]++);
      data.datasets.push({
        label: `Grupo ${x}`,
        data: Object.values(attrCounts),
        backgroundColor: [this.generateColor()],
        borderColor: [this.generateColor],
        borderWidth: 1,
      });
      return 0;
    });

    return [data, options];
  };

  transformDataScatter = () => {
    let data = {
      datasets: [],
    };
    Object.keys(this.props.groups).map(g => {
      let students = this.props.groups[g];
      let d = [];
      students.map(s =>
        d.push({ x: this.props.data[this.state.attribute][s], y: g })
      );

      data.datasets.push({
        label: `Grupo ${g}`,
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

  render() {
    return (
      <Row style={{ margin: "3%" }}>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <h3>Estadísticas</h3>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Container style={{ width: "100%" }}>
              {this.state.type === "Nominal" && (
                <Bar
                  data={this.transformDataBar()[0]}
                  options={this.transformDataBar()[1]}
                />
              )}
            </Container>

            <Container style={{ width: "100%" }}>
              {this.state.type === "Numérico" && (
                <Scatter
                  data={this.transformDataScatter()[0]}
                  options={this.transformDataScatter()[1]}
                />
              )}
            </Container>
          </Col>
          <Col md={3}>
            <Form>
              <Form.Label>
                Seleccione el atributo del que quiere ver las estadísticas
              </Form.Label>
              <Form.Select
                onChange={this.handleChangeAttribute}
                aria-label="Default select example"
              >
                <option></option>
                {Object.keys(this.props.data).map(x => (
                  <option value={x}>{x}</option>
                ))}
              </Form.Select>
            </Form>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default Statistics;
