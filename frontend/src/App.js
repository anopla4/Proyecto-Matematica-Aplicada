import "./App.css";
import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import Layout from "./components/Layout/Layout";
import Data from "./components/Data/Data";
import Groups from "./components/Groups/Groups";
import Statistics from "./components/Statistics/Statistics";
import Subset from "./components/Subset/Subset";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/settings" component={Settings} />
            <Route path="/data" component={Data} />
            <Route path="/groups" component={Groups} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/subset" component={Subset} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
