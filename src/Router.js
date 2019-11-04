import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Camera from "./components/Camera";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/screen" component={Camera} />
    </Switch>
  </BrowserRouter>
);

export default Router;
