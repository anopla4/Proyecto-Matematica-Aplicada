import React, { Component } from "react";
import { Col, Row, Button, Form, ListGroup, Tabs, Tab } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  numberFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import { withRouter } from "react-router-dom";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { transformDataBootstrapTable } from "../../utils";

class Subset extends Component {
  state = {
    numberOfGroups: 1,
    numberOfGroupsSubset: 1,
    data: undefined,
    attributesType: undefined,
    columns: undefined,
    selected: [],
    numberRows: 0,
    createSubset: false,
    subsetAttributes: [],
    studentsSubset: [],
    subsets: {},
    subsetOnScreen: 0,
    subsetToBeAdded: 0,
    groupsAssigned: 0,
  };

  componentWillMount() {
    let data = this.props.location.data.data;
    let rows = Object.values(data)[0].length;
    let stdSub = { 0: [] };
    for (let index = 0; index < rows; index++) {
      stdSub[0].push(index);
    }
    let attributesType = this.props.location.data.attributesType;
    let col = [];
    Object.keys(attributesType).map(x => {
      col.push({
        dataField: x,
        text: x,
        headerFormatter: (column, colIndex, components) => {
          return (
            <div>
              {column.text} {components.filterElement}
            </div>
          );
        },
        filter:
          this.props.location.data.attributesType[x] === "Nominal"
            ? textFilter()
            : numberFilter(),
      });
      return 0;
    });
    this.setState({
      data: data,
      attributesType: attributesType,
      columns: col,
      numberRows: rows,
      subsets: stdSub,
    });
  }

  componentDidMount() {
    while (document.querySelector(".sr-only") !== null) {
      var elem = document.querySelector(".sr-only");
      elem.parentNode.removeChild(elem);
    }
  }

  handleGenerateGroups = () => {
    this.props.history.push({
      pathname: "/groups",
      state: {
        data: this.state.data,
        attributesType: this.state.attributesType,
        subsets: this.state.subsets,
      },
    });
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row.id],
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter(x => x !== row.id),
      }));
    }
  };

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState(() => ({
        selected: ids,
      }));
    } else {
      this.setState(() => ({
        selected: [],
      }));
    }
  };

  handleChangeNumberGroups = e => {
    this.setState({ numberOfGroups: e.target.value });
  };

  handleChangeNumberGroupsSubset = e => {
    this.setState({
      numberOfGroupsSubset: e.target.value,
    });
  };

  handleCreateSubset = () => {
    this.setState({ createSubset: true });
  };

  handleAcceptSubset = () => {
    let newSubset = {};
    newSubset["attributes"] = [...this.state.subsetAttributes];
    newSubset["numberOfGroups"] = this.state.numberOfGroupsSubset;
    newSubset["students"] = [];
    let newSubsets = this.state.subsets;
    newSubsets[Object.keys(this.state.subsets).length] = newSubset;
    let groupsAssigned =
      this.state.groupsAssigned + this.state.numberOfGroupsSubset;
    this.setState({
      createSubset: false,
      subsetAttributes: [],
      numberOfGroupsSubset: 1,
      subsets: newSubsets,
      groupsAssigned: groupsAssigned,
    });
  };

  handleSelectAttributes = e => {
    let attr = [];
    e.map(x => attr.push([x, 1]));
    this.setState({ subsetAttributes: attr });
  };

  handleImportanceAttribute = e => {
    let subsetAttr = [...this.state.subsetAttributes];
    subsetAttr[e.target.id][1] = parseInt(e.target.value);
    this.setState({ subsetAttributes: subsetAttr });
  };

  handleOnChangeSubsetToBeAdded = e => {
    this.setState({ subsetToBeAdded: e.target.value });
  };

  handleAssignStudentsToSubset = () => {
    if (this.state.subsetToBeAdded === 0) {
      return;
    } else {
      let subs = this.state.subsets;
      subs[this.state.subsetToBeAdded]["students"] = subs[
        this.state.subsetToBeAdded
      ]["students"].concat(this.state.selected);
      subs[0] = subs[0].filter(x => !this.state.selected.includes(x));
      let newSelected = this.state.selected;
      newSelected = newSelected.filter(
        x => !subs[this.state.subsetToBeAdded]["students"].includes(x)
      );
      this.setState({ subsets: subs, selected: newSelected });
    }
  };

  handleChangeSubsetOnScreen = e => {
    let n = parseInt(e);
    this.setState({ subsetOnScreen: n, selected: [] });
  };

  handleUnassignStudents = () => {
    let newSubsets = this.state.subsets;
    this.state.selected.map(x => newSubsets[0].push(x));
    if (this.state.subsetOnScreen !== 0) {
      newSubsets[this.state.subsetOnScreen]["students"] = newSubsets[
        this.state.subsetOnScreen
      ]["students"].filter(x => !this.state.selected.includes(x));
      this.setState({ selected: [], subsets: newSubsets });
    }
  };

  render() {
    return (
      <Row style={{ margin: "3%" }}>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <h3>Configurar subconjuntos</h3>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={3}>
            <h6>Elija la cantidad de grupos total que quiere: </h6>
          </Col>
          <Col md={1}>
            <Form>
              <Form.Control
                onChange={this.handleChangeNumberGroups}
                min={this.state.groupsAssigned}
                type="number"
              ></Form.Control>
            </Form>
          </Col>
        </Row>
        <Tabs
          onSelect={this.handleChangeSubsetOnScreen}
          id="subsets-tabs"
          defaultActiveKey={"0"}
          className="mb-3 mt-5"
        >
          {Object.keys(this.state.subsets).map(x => (
            <Tab
              eventKey={x}
              title={x === "0" ? "Sin asignar" : `Subconjunto ${x}`}
            >
              <Row>
                <Col md={9}>
                  <Row>
                    <Col style={{ overflow: "scroll" }}>
                      <BootstrapTable
                        keyField="id"
                        data={transformDataBootstrapTable(
                          this.state.data,
                          this.state.attributesType
                        ).filter(y => {
                          if (x === "0") {
                            return this.state.subsets[x].includes(y.id);
                          }
                          return this.state.subsets[x]["students"].includes(
                            y.id
                          );
                        })}
                        columns={this.state.columns}
                        filter={filterFactory()}
                        selectRow={{
                          mode: "checkbox",
                          clickToSelect: true,
                          selected: this.state.selected,
                          onSelect: this.handleOnSelect,
                          onSelectAll: this.handleOnSelectAll,
                        }}
                      />
                    </Col>
                  </Row>
                  {x === "0" && (
                    <Row className="mt-3">
                      <Col md={7}>
                        <Row>
                          <Col md={6}>
                            <Button
                              onClick={this.handleAssignStudentsToSubset}
                              variant="secondary"
                            >
                              Asignar estudiantes al subconjunto{" "}
                            </Button>
                          </Col>
                          <Col md={2}>
                            <Form.Control
                              onChange={this.handleOnChangeSubsetToBeAdded}
                              min={0}
                              max={Object.keys(this.state.subsets).length - 1}
                              type="number"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                  {x !== "0" && (
                    <Row>
                      <Col md={7}>
                        <Button
                          variant="danger"
                          onClick={this.handleUnassignStudents}
                        >
                          Eliminar estudiantes seleccionados
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={3}>
                  <Row style={{ paddingLeft: "20%" }}>
                    <Button
                      style={{ width: "70%", float: "right" }}
                      onClick={this.handleCreateSubset}
                      variant="success"
                    >
                      Crear subconjunto
                    </Button>
                  </Row>
                  {this.state.createSubset && (
                    <Row style={{ paddingLeft: "10%" }} className="mt-5">
                      <Form>
                        <Form.Label>
                          <h6>
                            Elija la cantidad de grupos para este subconjunto
                          </h6>
                        </Form.Label>
                        <Form.Control
                          onChange={this.handleChangeNumberGroupsSubset}
                          min={1}
                          max={
                            this.state.numberOfGroups -
                            this.state.groupsAssigned
                          }
                          type="number"
                          style={{ width: "20%" }}
                        />
                        <Form.Label className="mt-3">
                          <h6>
                            Elija los atributos importantes para este
                            subconjunto
                          </h6>
                        </Form.Label>
                        <DropdownMultiselect
                          style={{ width: "40%" }}
                          placeholder="Seleccione los atributos relevantes..."
                          handleOnChange={this.handleSelectAttributes}
                          options={Object.keys(this.state.data)}
                          name="attributes"
                        />
                      </Form>
                      <ListGroup className="mt-3">
                        {this.state.subsetAttributes.map(x => (
                          <ListGroup.Item>
                            {x[0]}{" "}
                            <Form.Range
                              id={x[0]}
                              defaultValue={x[1]}
                              min={0.1}
                              max={10}
                              onChange={this.handleImportanceAttribute}
                            />
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <Button
                        style={{ width: "25%" }}
                        variant="primary"
                        onClick={this.handleAcceptSubset}
                        className="mt-5"
                      >
                        Aceptar
                      </Button>
                    </Row>
                  )}
                </Col>
              </Row>
            </Tab>
          ))}
        </Tabs>

        <Row>
          <Col className="d-flex align-items-end justify-content-end">
            <Button onClick={this.handleGenerateGroups}>Generar grupos</Button>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default withRouter(Subset);
