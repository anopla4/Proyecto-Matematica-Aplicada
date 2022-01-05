import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  Tabs,
  Tab,
  ButtonGroup,
  Tooltip,
  OverlayTrigger,
  Toast,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  numberFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import { withRouter } from "react-router-dom";
import CreateSubset from "../CreateSubset/CreateSubset";
import AdvancedOptions from "../AdvancedOptions/AdvancedOptions";
import { transformDataBootstrapTable, removeRepeated } from "../../utils";
import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import "./Subset.css";

class Subset extends Component {
  state = {
    numberOfGroups: 1,
    numberOfGroupsSubset: 1,
    data: {},
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
    toastSubsetNotCompleted: false,
    importantAttributeSelected: true,
    numberOfSubsetGroupsSelected: false,
    invalidNumberOfGroups: false,
    studentsUnassigned: false,
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
    if (!this.state.subsetNoCompleted && this.state.subsets[0].length === 0) {
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
    } else if (this.state.subsets[0].length > 0)
      this.setState({ studentsUnassigned: true });
    else this.setState({ toastSubsetNotCompleted: true });
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
      numberOfSubsetGroupsSelected: true,
      invalidNumberOfGroups: false,
    });
  };

  handleCreateSubset = () => {
    if (!this.state.subsetNoCompleted) this.setState({ createSubset: true });
    else this.setState({ toastSubsetNotCompleted: true });
  };

  handleAcceptSubset = () => {
    // if (!this.state.numberOfSubsetGroupsSelected) {
    //   this.setState({ invalidNumberOfGroups: true });
    //   return;
    // }
    if (Object.keys(this.state.subsetAttributes).length === 0) {
      this.setState({ importantAttributeSelected: false });
      return;
    }
    let newSubset = {};
    newSubset["attributes"] = Object.entries(this.state.subsetAttributes);
    newSubset["numberOfGroups"] = this.state.numberOfGroupsSubset;
    newSubset["students"] = [];
    let newSubsets = { ...this.state.subsets };
    let students = [];
    if (
      Object.keys(this.state.restrictions).filter(
        x => Object.keys(this.state.restrictions[x]).length > 0
      ).length === 0
    )
      students = this.state.subsets[0];
    else {
      Object.keys(this.state.restrictions)
        .filter(x => Object.keys(this.state.restrictions[x]).length > 0)
        .map(r => {
          let l = [];
          this.state.data[r].map((x, index) => {
            let minB = this.state.restrictions[r]["minBound"];
            let maxB = this.state.restrictions[r]["minBound"];
            let values = this.state.restrictions[r]["values"];
            if (
              minB !== undefined &&
              maxB !== undefined &&
              parseFloat(minB) <= parseFloat(x) &&
              parseFloat(maxB) >= parseFloat(x)
            ) {
              l.push(index);
            } else if (
              minB !== undefined &&
              maxB === undefined &&
              parseFloat(minB) <= parseFloat(x)
            ) {
              l.push(index);
            } else if (
              maxB !== undefined &&
              minB === undefined &&
              parseFloat(maxB) >= parseFloat(x)
            ) {
              l.push(index);
            } else if (values !== undefined && values.includes(x)) {
              l.push(index);
            }
            return 0;
          });
          students = students.concat(l);
          return 0;
        });
    }

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
      restrictions: {},
      numberOfGroupsSubset: 1,
      subsets: newSubsets,
      groupsAssigned: groupsAssigned,
      subsetNoCompleted: subsetNoCompleted,
      numberOfSubsetGroupsSelected: false,
      importantAttributeSelected: true,
      invalidNumberOfGroups: false,
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
    this.setState({ subsetAttributes: attr, importantAttributeSelected: true });
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
      let isSubsetComplete = false;
      let subset = subs[this.state.subsetToBeAdded];
      subset["students"] = subset["students"].concat(this.state.selected);
      let numberStudentsGroup =
        this.state.numberRows / this.state.numberOfGroups;
      if (
        subset["students"].length >=
          (numberStudentsGroup - 2) * subset["numberOfGroups"] &&
        subset["students"].length <=
          (numberStudentsGroup + 2) * subset["numberOfGroups"]
      )
        isSubsetComplete = true;
      subs[0] = subs[0].filter(x => !this.state.selected.includes(x));
      let newSelected = this.state.selected;
      newSelected = newSelected.filter(
        x => !subs[this.state.subsetToBeAdded]["students"].includes(x)
      );
      this.setState({
        subsets: subs,
        selected: newSelected,
        subsetNoCompleted: !isSubsetComplete,
      });
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
      let subsetDisplayed = newSubsets[this.state.subsetOnScreen];
      subsetDisplayed["students"] = subsetDisplayed["students"].filter(
        x => !this.state.selected.includes(x)
      );
      let isSubsetComplete = false;
      let numberStudentsGroup =
        this.state.numberRows / this.state.numberOfGroups;
      if (
        subsetDisplayed["students"].length >=
          (numberStudentsGroup - 2) * subsetDisplayed["numberOfGroups"] &&
        subsetDisplayed["students"].length <=
          (numberStudentsGroup + 2) * subsetDisplayed["numberOfGroups"]
      ) {
        isSubsetComplete = true;
      }
      this.setState({
        selected: [],
        subsets: newSubsets,
        subsetNoCompleted: !isSubsetComplete,
      });
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

  handleRemoveSubset = () => {
    let newSubsets = {};
    newSubsets["0"] = this.state.subsets[0].concat(
      this.state.subsets[this.state.subsetOnScreen]["students"]
    );
    Object.keys(this.state.subsets)
      .filter(x => parseInt(x) !== this.state.subsetOnScreen && x !== "0")
      .map(x => (newSubsets[x] = this.state.subsets[x]));
    let groupsAssigned =
      this.state.groupsAssigned -
      this.state.subsets[this.state.subsetOnScreen]["numberOfGroups"];
    this.setState({
      subsets: newSubsets,
      subsetOnScreen: 0,
      groupsAssigned: groupsAssigned,
    });
  };

  render() {
    const configs = {
      animate: true,
      // top: `5em`,
      clickDismiss: false,
      escapeDismiss: false,
      // focusOutline: false,
    };

    while (document.querySelector(".sr-only") !== null) {
      var elem = document.querySelector(".sr-only");
      elem.parentNode.removeChild(elem);
    }
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
            <small>Este campo es requerido.</small>
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
          <Col>
            <Toast
              show={
                this.state.toastSubsetNotCompleted ||
                this.state.studentsUnassigned
              }
              onClose={() =>
                this.setState({
                  toastSubsetNotCompleted: false,
                  studentsUnassigned: false,
                })
              }
              className="d-inline-block m-1"
              bg={"danger"}
            >
              <Toast.Header>
                <strong className="me-auto">Atención</strong>
              </Toast.Header>
              {this.state.toastSubsetNotCompleted && (
                <Toast.Body className="text-white">
                  Debe modificar el subconjunto creado antes de continuar.
                </Toast.Body>
              )}
              {this.state.studentsUnassigned && (
                <Toast.Body className="text-white">
                  Debe asignar todos los estudiantes a algún subconjunto.
                </Toast.Body>
              )}
            </Toast>
          </Col>
          <Col md={2}>
            <Row>
              <Col>
                <Button
                  disabled={
                    this.state.groupsAssigned === this.state.numberOfGroups &&
                    this.state.numberOfGroups === 0
                  }
                  onClick={this.handleCreateSubset}
                  variant="success"
                >
                  Crear subconjunto
                </Button>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <small>Debe crear al menos un subconjunto.</small>
              </Col>
            </Row>
          </Col>
        </Row>
        <div id="tab-override">
          <Tabs
            onSelect={this.handleChangeSubsetOnScreen}
            id="subsets-tabs"
            defaultActiveKey={"0"}
            className="mb-3 mt-5"
          >
            {Object.keys(this.state.subsets).map((x, i) => (
              <Tab
                eventKey={x}
                title={x === "0" ? "Sin asignar" : `Subconjunto ${x}`}
                tabClassName={
                  this.state.subsetNoCompleted &&
                  Object.keys(this.state.subsets).length === i + 1
                    ? "stateWrong"
                    : ""
                }
              >
                <Row>
                  <Col>
                    <Row>
                      <Col style={{ overflow: "scroll", maxHeight: "100vh" }}>
                        {this.state.subsetNoCompleted &&
                          Object.keys(this.state.subsets).length === i + 1 && (
                            <Row>
                              <Col style={{ color: "red" }}>
                                Debe modificar la cantidad de estudiantes
                                asignados a este subconjunto para obtener grupos
                                balanceados en cuanto a su cardinalidad.
                              </Col>
                            </Row>
                          )}
                        <Row>
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
                        </Row>
                      </Col>
                    </Row>
                    {x === "0" && (
                      <Row className="mt-3">
                        <Col md={6}>
                          <ButtonGroup>
                            <Col md={9}>
                              <Button
                                onClick={this.handleAssignStudentsToSubset}
                                variant="secondary"
                              >
                                Asignar estudiantes al subconjunto{" "}
                              </Button>
                            </Col>
                            <Col style={{ height: "inherit" }}>
                              <Form.Control
                                style={{ height: "100%" }}
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
                        <Col></Col>
                        <Col md={2}>
                          <Button
                            variant="danger"
                            onClick={this.handleRemoveSubset}
                          >
                            <BsTrashFill />
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
                <CreateSubset
                  show={this.state.createSubset}
                  handleCloseOverlay={() =>
                    this.setState({
                      createSubset: false,
                      subsetAttributes: {},
                      numberOfGroupsSubset: 1,
                      restrictions: {},
                    })
                  }
                  invalidNumberOfGroups={this.state.invalidNumberOfGroups}
                  handleChangeNumberGroupsSubset={
                    this.handleChangeNumberGroupsSubset
                  }
                  numberOfGroups={this.state.numberOfGroups}
                  groupsAssigned={this.state.groupsAssigned}
                  importantAttributeSelected={
                    this.state.importantAttributeSelected
                  }
                  handleSelectAttributes={this.handleSelectAttributes}
                  data={this.state.data}
                  subsetAttributes={this.state.subsetAttributes}
                  handleImportanceAttribute={this.handleImportanceAttribute}
                  handleSelectRestrictions={this.handleSelectRestrictions}
                  restrictions={this.state.restrictions}
                  attributesType={this.state.attributesType}
                  handleMaxBound={this.handleMaxBound}
                  handleMinBound={this.handleMinBound}
                  handleSelectValues={this.handleSelectValues}
                  handleAcceptSubset={this.handleAcceptSubset}
                />
              </Tab>
            ))}
          </Tabs>
        </div>

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
            <AdvancedOptions
              handleCloseOverlayAdvancedOptions={() =>
                this.setState({
                  advancedOptions: false,
                })
              }
              show={this.state.advancedOptions}
              configs={configs}
              handleChangeMethod={this.handleChangeMethod}
              method={this.state.method}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export default withRouter(Subset);
