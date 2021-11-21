import React, { Component } from "react";
import { Bar, Pie, Scatter } from "react-chartjs-2";
import { Row, Col, Container } from "react-bootstrap";

class Statistics extends Component {
  state = {
    type: "continue",
    attribute: "Provincia",
    data: {
      labels: ["La Habana", "Matanzas", "Pinar del Río"],
      datasets: [
        {
          label: "Grupo 1",
          data: [1, 3, 1],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
        {
          label: "Grupo 2",
          data: [1, 1, 1],
          backgroundColor: ["rgba(120, 159, 64, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
    dataPie: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [3, 5, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    dataScatter: {
      datasets: [
        {
          label: "Grupo 1",
          data: [
            { x: 89, y: 1 },
            { x: 99.81, y: 1 },
          ],
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "Grupo 2",
          data: [
            { x: 89, y: 2 },
            { x: 99.81, y: 2 },
          ],
          backgroundColor: "rgba(120, 99, 132, 1)",
        },
        {
          label: "Grupo 3",
          data: [
            { x: 89, y: 3 },
            { x: 99.81, y: 3 },
          ],
          backgroundColor: "rgba(255, 234, 132, 1)",
        },
      ],
    },
    optionsScatter: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
  render() {
    return (
      <Row>
        <Col>
          <Container style={{ width: "60%" }}>
            {this.state.type === "nominal" && <Bar data={this.state.data} />}
          </Container>
          <Container className="mt-5" style={{ width: "60%" }}>
            {this.state.type === "nominal" && <Pie data={this.state.dataPie} />}
          </Container>

          <Container style={{ width: "60%" }}>
            {this.state.type === "continue" && (
              <Scatter
                data={this.state.dataScatter}
                options={this.state.optionsScatter}
              />
            )}
          </Container>
        </Col>
      </Row>
    );
  }
}

export default Statistics;
