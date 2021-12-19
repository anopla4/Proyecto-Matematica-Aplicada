import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  ListGroup,
  Tabs,
  Tab,
  ButtonGroup,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  numberFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import { withRouter } from "react-router-dom";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Overlay from "react-overlay-component";
import Restriction from "../Restriction/Restriction";
import { transformDataBootstrapTable, removeRepeated } from "../../utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Subset.css";

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
    subsetAttributes: {},
    studentsSubset: [],
    subsets: {},
    subsetOnScreen: 0,
    subsetToBeAdded: 0,
    groupsAssigned: 0,
    method: "kmean",
    advancedOptions: false,
    restrictions: {},
    subsetNoCompleted: false,
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
    let s = this.state.subsets;
    delete s[0];
    this.props.history.push({
      pathname: "/groups",
      state: {
        data: this.state.data,
        attributesType: this.state.attributesType,
        subsets: this.state.subsets,
        method: this.state.method,
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
    newSubset["attributes"] = Object.entries(this.state.subsetAttributes);
    newSubset["numberOfGroups"] = this.state.numberOfGroupsSubset;
    newSubset["students"] = [];
    let newSubsets = { ...this.state.subsets };
    let students = [];
    Object.keys(this.state.restrictions).map(r => {
      let l = [];
      this.state.data[r].map((x, index) => {
        let minB = this.state.restrictions[r]["minBound"];
        let maxB = this.state.restrictions[r]["minBound"];
        let values = this.state.restrictions[r]["values"];
        if (
          minB !== undefined &&
          maxB !== undefined &&
          minB <= x &&
          maxB >= x
        ) {
          l.push(index);
        } else if (minB !== undefined && minB <= x) {
          l.push(index);
        } else if (maxB !== undefined && maxB >= x) {
          l.push(index);
        } else if (values !== undefined && values.includes(x)) {
          l.push(index);
        }
        return 0;
      });
      students = students.concat(l);
      return 0;
    });
    let numberStudentsGroup = this.state.numberRows / this.state.numberOfGroups;
    let subsetNoCompleted = false;
    if (
      students.length <=
        (numberStudentsGroup - 2) * this.state.numberOfGroupsSubset ||
      students.length >=
        (numberStudentsGroup + 2) * this.state.numberOfGroupsSubset
    ) {
      subsetNoCompleted = true;
    }
    newSubset["students"] = removeRepeated(students);
    newSubsets[0] = newSubsets[0].filter(
      x => !newSubset["students"].includes(x)
    );
    newSubsets[Object.keys(this.state.subsets).length] = newSubset;
    let groupsAssigned =
      this.state.groupsAssigned + this.state.numberOfGroupsSubset;
    this.setState({
      createSubset: false,
      subsetAttributes: {},
      numberOfGroupsSubset: 1,
      subsets: newSubsets,
      groupsAssigned: groupsAssigned,
      subsetNoCompleted: subsetNoCompleted,
    });
  };

  handleMinBound = (e, index) => {
    let rest = this.state.restrictions;
    rest[index]["minBound"] = e.target.value;
    this.setState({ restrictions: rest });
  };

  handleMaxBound = (e, index) => {
    let rest = this.state.restrictions;
    rest[index]["maxBound"] = e.target.value;
    this.setState({ restrictions: rest });
  };

  handleSelectValues = (e, index) => {
    let rest = this.state.restrictions;
    rest[index]["values"] = e;
    this.setState({ restrictions: rest });
  };

  handleSelectAttributes = e => {
    let attr = {};
    e.map(x => (attr[x] = 1));
    this.setState({ subsetAttributes: attr });
  };

  handleImportanceAttribute = e => {
    let subsetAttr = this.state.subsetAttributes;
    subsetAttr[e.target.id] = parseInt(e.target.value);
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

  handleAdvancedOptions = () => {
    this.setState({ advancedOptions: true });
  };

  handleSelectRestrictions = e => {
    let rest = { ...this.state.restrictions };
    let newRest = {};
    e.map(x =>
      Object.keys(rest).includes(x) ? (newRest[x] = rest[x]) : (newRest[x] = {})
    );
    this.setState({ restrictions: newRest });
  };

  render() {
    const configs = {
      animate: true,
      // top: `5em`,
      clickDismiss: false,
      escapeDismiss: false,
      // focusOutline: false,
    };
    return (
      <Row className="mb-3" style={{ margin: "3%" }}>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <h3>Particione los datos</h3>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={3}>
            <h6>Elija la cantidad de grupos total que quiere: </h6>
          </Col>
          <Col md={2}>
            <Form>
              <Form.Control
                onChange={this.handleChangeNumberGroups}
                min={this.state.groupsAssigned}
                type="number"
              ></Form.Control>
            </Form>
          </Col>
          <Col></Col>
          <Col md={3}>
            <Button onClick={this.handleCreateSubset} variant="success">
              Crear subconjunto
            </Button>
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
                <Col>
                  <Row>
                    <Col style={{ overflow: "scroll", maxHeight: "100vh" }}>
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
                      <Col md={6}>
                        <ButtonGroup>
                          <Col md={10}>
                            <Button
                              onClick={this.handleAssignStudentsToSubset}
                              variant="secondary"
                            >
                              Asignar estudiantes al subconjunto{" "}
                            </Button>
                          </Col>
                          <Col>
                            <Form.Control
                              onChange={this.handleOnChangeSubsetToBeAdded}
                              min={0}
                              max={Object.keys(this.state.subsets).length - 1}
                              type="number"
                            />
                          </Col>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  )}
                  {x !== "0" && (
                    <Row className="mt-3">
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
              </Row>
              <Overlay
                configs={configs}
                isOpen={this.state.createSubset}
                closeOverlay={() =>
                  this.setState({
                    createSubset: false,
                    subsetAttributes: {},
                    numberOfGroupsSubset: 1,
                  })
                }
              >
                <Row>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-center">
                      <h3>Configurar subconjunto</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Form>
                      <Row>
                        <Col>
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
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Row>
                            <Col>
                              <Form.Label className="mt-3">
                                <h6>
                                  Elija los atributos importantes para este
                                  subconjunto
                                </h6>
                              </Form.Label>
                              {this.state.createSubset && (
                                <DropdownMultiselect
                                  style={{ width: "40%" }}
                                  placeholder="Seleccione los atributos relevantes..."
                                  handleOnChange={this.handleSelectAttributes}
                                  options={Object.keys(this.state.data)}
                                  name="attributes"
                                />
                              )}
                            </Col>
                          </Row>

                          <Row className="attrImportance">
                            <Col>
                              <ListGroup className="mt-3">
                                {Object.entries(
                                  this.state.subsetAttributes
                                ).map(x => (
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
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row>
                            <Col>
                              <Form.Label className="mt-3">
                                <h6>
                                  Elija las restricciones para este subconjunto
                                </h6>
                              </Form.Label>
                              {this.state.createSubset && (
                                <DropdownMultiselect
                                  style={{ width: "40%" }}
                                  placeholder="Seleccione los atributos..."
                                  handleOnChange={this.handleSelectRestrictions}
                                  options={Object.keys(this.state.data)}
                                  name="attributes"
                                />
                              )}
                            </Col>
                          </Row>
                          <Row className="attrImportance">
                            <Col>
                              {Object.keys(this.state.restrictions).map(x => (
                                <Restriction
                                  attribute={x}
                                  type={this.state.attributesType[x]}
                                  handleMaxBound={this.handleMaxBound}
                                  handleMinBound={this.handleMinBound}
                                  handleSelectValues={this.handleSelectValues}
                                  values={
                                    this.state.attributesType[x] === "Nominal"
                                      ? removeRepeated(this.state.data[x])
                                      : []
                                  }
                                />
                              ))}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </Row>

                  <Row>
                    <Col className="d-flex align-items-end justify-content-end">
                      <Button
                        style={{ width: "25%" }}
                        variant="primary"
                        onClick={this.handleAcceptSubset}
                        className="mt-5"
                      >
                        Aceptar
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </Overlay>
            </Tab>
          ))}
        </Tabs>

        <Row className="mt-3 mb-3">
          <Col className="d-flex align-items-end justify-content-end">
            <ButtonGroup>
              <Button onClick={this.handleGenerateGroups}>
                Generar grupos
              </Button>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={"advancedOptions"}>Opciones avanzadas</Tooltip>
                }
              >
                <Button onClick={this.handleAdvancedOptions}>
                  <BsThreeDotsVertical />
                </Button>
              </OverlayTrigger>
            </ButtonGroup>
            <Overlay
              configs={configs}
              isOpen={this.state.advancedOptions}
              closeOverlay={() =>
                this.setState({
                  advancedOptions: false,
                })
              }
            >
              <Row>
                <Col>
                  <h4>
                    Elija el método que quiere utilizar para la conformación de
                    los grupos
                  </h4>
                </Col>
              </Row>
              <Row>
                <Form>
                  <Form.Check
                    onClick={() => this.setState({ method: "kmean" })}
                    checked={this.state.method === "kmean"}
                    type="radio"
                    id="kmean"
                    label="K-means"
                    name="K-means"
                  />
                  <Form.Check
                    onClick={() => this.setState({ method: "methauristic" })}
                    checked={this.state.method === "methauristic"}
                    type="radio"
                    id="metaheuristic"
                    label="Metaheurística"
                    name="Metaheurística"
                  />
                </Form>
              </Row>
            </Overlay>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default withRouter(Subset);
