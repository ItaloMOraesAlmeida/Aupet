import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/home";
import Map from "../pages/map";
import CadastroCasa from "../pages/cadastroCasa";
import CasaAdocao from "../pages/casaAdocao";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/mapa" component={Map} />

      <Route path="/casaadocao/cadastro" component={CadastroCasa} />
      <Route path="/casaadocao/:id" component={CasaAdocao} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
