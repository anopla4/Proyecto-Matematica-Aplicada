import "./App.css";
import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Data from "./components/Data/Data";
import Groups from "./components/Groups/Groups";
import Subset from "./components/Subset/Subset";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import { removeRepeated } from "./utils";

class App extends Component {
  state = {
    data: undefined,
    attributesType: {},
    subsets: {},
    numberOfGroups: 1,
    groupsAssigned: 0,
    spinner: false,
    rows: 0,
    createSubset: false,
    subsetAttributes: {},
    restrictions: {},
    numberOfGroupsSubset: 1,
    subsetNoCompleted: false,
    numberOfSubsetGroupsSelected: false,
    importantAttributeSelected: true,
    invalidNumberOfGroups: false,
    studentsSubset: [],
    subsetToBeAdded: 0,
    selected: [],
    toastSubsetNotCompleted: false,
    subsetOnScreen: 0,
  };
  handleTypeAttributes = e => {
    let attr = e.target.id;
    let selectedType = e.target.options[e.target.selectedIndex].innerText;
    let newAttrType = this.state.attributesType;
    newAttrType[attr] = selectedType;
    this.setState({ attributesType: newAttrType });
  };

  handleFileUpload = e => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", e.target.files[0], e.target.files[0].name);
    // "https://ourapigroups.herokuapp.com/file";
    this.setState({ spinner: true });

    fetch("http://127.0.0.1:8000/file", {
      method: "POST",
      body: formdata,
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        response = JSON.parse(response);
        let attr = Object.keys(response);
        let attrType = {};
        attr.map(x =>
          typeof response[x][0] === "string"
            ? (attrType[x] = "Nominal")
            : (attrType[x] = "Numérico")
        );
        let d = {};
        Object.keys(response).map(x => (d[x] = Object.values(response[x])));
        let rows = Object.values(d)[0].length;
        let stdSub = { 0: [] };
        for (let index = 0; index < rows; index++) {
          stdSub[0].push(index);
        }
        this.setState({
          data: d,
          attributesType: attrType,
          spinner: false,
          subsets: stdSub,
          rows: rows,
        });
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
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
    if (!this.state.numberOfSubsetGroupsSelected) {
      this.setState({ invalidNumberOfGroups: true });
      return;
    }
    if (Object.keys(this.state.subsetAttributes).length === 0) {
      this.setState({ importantAttributeSelected: false });
      return;
    }
    let newSubset = {};
    newSubset["attributes"] = Object.entries(this.state.subsetAttributes);
    newSubset["numberOfGroups"] = this.state.numberOfGroupsSubset;
    newSubset["students"] = [];
    let newSubsets = { ...this.props.subsets };
    let students = [];
    if (
      Object.keys(this.state.restrictions).filter(
        x => Object.keys(this.state.restrictions[x]).length > 0
      ).length === 0
    )
      students = this.props.subsets[0];
    else {
      Object.keys(this.state.restrictions)
        .filter(x => Object.keys(this.state.restrictions[x]).length > 0)
        .map(r => {
          let l = [];
          this.props.data[r].map((x, index) => {
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
    newSubsets[Object.keys(this.props.subsets).length] = newSubset;
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
      let subs = this.props.subsets;
      let isSubsetComplete = false;
      subs[this.state.subsetToBeAdded]["students"] = subs[
        this.state.subsetToBeAdded
      ]["students"].concat(this.state.selected);
      let numberStudentsGroup =
        this.state.numberRows / this.state.numberOfGroups;
      if (
        subs[this.state.subsetToBeAdded]["students"].length >=
          (numberStudentsGroup - 2) *
            [this.state.subsetToBeAdded]["numberOfGroups"] &&
        subs[this.state.subsetToBeAdded]["students"].length <=
          (numberStudentsGroup + 2) *
            [this.state.subsetToBeAdded]["numberOfGroups"]
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

  handleUnassignStudents = () => {
    let newSubsets = this.props.subsets;
    this.state.selected.map(x => newSubsets[0].push(x));
    if (this.state.subsetOnScreen !== 0) {
      newSubsets[this.state.subsetOnScreen]["students"] = newSubsets[
        this.state.subsetOnScreen
      ]["students"].filter(x => !this.state.selected.includes(x));
      let isSubsetComplete = false;
      let numberStudentsGroup = this.state.rows / this.state.numberOfGroups;
      if (
        newSubsets[this.state.subsetToBeAdded]["students"].length >=
          (numberStudentsGroup - 2) *
            [this.state.subsetToBeAdded]["numberOfGroups"] &&
        newSubsets[this.state.subsetToBeAdded]["students"].length <=
          (numberStudentsGroup + 2) *
            [this.state.subsetToBeAdded]["numberOfGroups"]
      )
        isSubsetComplete = true;
      this.setState({
        selected: [],
        subsets: newSubsets,
        subsetNoCompleted: !isSubsetComplete,
      });
    }
  };

  handleSelectRestrictions = e => {
    let rest = { ...this.state.restrictions };
    let newRest = {};
    e.map(x =>
      Object.keys(rest).includes(x) ? (newRest[x] = rest[x]) : (newRest[x] = {})
    );
    this.setState({ restrictions: newRest });
  };

  handleGenerateGroups = () => {
    if (!this.state.subsetNoCompleted) {
      let s = this.props.subsets;
      delete s[0];
      this.props.history.push({
        pathname: "/groups",
        state: {
          data: this.props.data,
          attributesType: this.props.attributesType,
          subsets: this.props.subsets,
          method: this.state.method,
        },
      });
    } else this.setState({ toastSubsetNotCompleted: true });
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

  handleChangeSubsetOnScreen = e => {
    let n = parseInt(e);
    this.setState({ subsetOnScreen: n, selected: [] });
  };
  handleCloseOverlay = () =>
    this.setState({
      createSubset: false,
      subsetAttributes: {},
      numberOfGroupsSubset: 1,
      restrictions: {},
    });

  render() {
    return (
      <BrowserRouter>
        <ScrollTop>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/data"
                component={props => (
                  <Data
                    {...props}
                    data={this.state.data}
                    attributesType={this.state.attributesType}
                    handleTypeAttributes={this.handleTypeAttributes}
                    handleFileUpload={this.handleFileUpload}
                  />
                )}
              />
              <Route path="/groups" component={Groups} />
              <Route
                path="/subset"
                component={props => (
                  <Subset
                    {...props}
                    data={this.state.data}
                    attributesType={this.state.attributesType}
                    subsets={this.state.subsets}
                    createSubset={this.state.createSubset}
                    subsetAttributes={this.state.subsetAttributes}
                    groupsAssigned={this.state.groupsAssigned}
                    restrictions={this.state.restrictions}
                    numberOfGroupsSubset={this.state.numberOfGroupsSubset}
                    numberOfGroups={this.state.numberOfGroups}
                    subsetNoCompleted={this.state.subsetNoCompleted}
                    numberOfSubsetGroupsSelected={
                      this.state.numberOfSubsetGroupsSelected
                    }
                    importantAttributeSelected={
                      this.state.importantAttributeSelected
                    }
                    invalidNumberOfGroups={this.state.invalidNumberOfGroups}
                    studentsSubset={this.state.studentsSubset}
                    subsetToBeAdded={this.state.subsetToBeAdded}
                    rows={this.state.rows}
                    selected={this.state.selected}
                    toastSubsetNotCompleted={this.state.toastSubsetNotCompleted}
                    subsetOnScreen={this.state.subsetOnScreen}
                    handleChangeNumberGroups={this.handleChangeNumberGroups}
                    handleChangeNumberGroupsSubset={
                      this.handleChangeNumberGroupsSubset
                    }
                    handleCreateSubset={this.handleCreateSubset}
                    handleAcceptSubset={this.handleAcceptSubset}
                    handleMinBound={this.handleMinBound}
                    handleMaxBound={this.handleMaxBound}
                    handleSelectValues={this.handleSelectValues}
                    handleSelectAttributes={this.handleSelectAttributes}
                    handleImportanceAttribute={this.handleImportanceAttribute}
                    handleOnChangeSubsetToBeAdded={
                      this.handleOnChangeSubsetToBeAdded
                    }
                    handleAssignStudentsToSubset={
                      this.handleAssignStudentsToSubset
                    }
                    handleUnassignStudents={this.handleUnassignStudents}
                    handleSelectRestrictions={this.handleSelectRestrictions}
                    handleGenerateGroups={this.handleGenerateGroups}
                    handleOnSelect={this.handleOnSelect}
                    handleOnSelectAll={this.handleOnSelectAll}
                    handleChangeSubsetOnScreen={this.handleChangeSubsetOnScreen}
                    handleCloseOverlay={this.handleCloseOverlay}
                  />
                )}
              />
            </Switch>
          </Layout>
        </ScrollTop>
      </BrowserRouter>
    );
  }
}

export default App;
