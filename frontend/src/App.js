import "./App.css";
import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Data from "./components/Data/Data";
import Groups from "./components/Groups/Groups";
import Subset from "./components/Subset/Subset";
import ScrollTop from "./components/ScrollTop/ScrollTop";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollTop>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/data" component={Data} />
              <Route path="/groups" component={Groups} />
              <Route path="/subset" component={Subset} />
            </Switch>
          </Layout>
        </ScrollTop>
      </BrowserRouter>
    );
  }
}

export default App;
