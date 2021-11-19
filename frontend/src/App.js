import "./App.css";
import { Component } from "react";
// import { Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import Layout from "./components/Layout/Layout";
import Data from "./components/Data/Data";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
