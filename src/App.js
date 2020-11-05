import React from 'react';
import './layout/layout.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import store from './store/store'
import { Provider } from 'react-redux'

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import Auth from './context/AuthContext'
import Dashboard from './layout/dashboard'
import Tareas from './secciones/tareas/index'
import Colaboradores from './secciones/colaboradores/index'
import Clientes from './secciones/clientes/index'
import Invitacion from './secciones/nuevosUsuarios/invitacion'
import Login from './secciones/login/index'
/*Perfil de puestos */
import Perfil from './secciones/perfilPuestos/index'
import NuevoPerfil from './secciones/perfilPuestos/nuevoPerfil'
import Perfiles from './secciones/perfilPuestos/perfiles'
import EditPerfil from './secciones/perfilPuestos/editPerfil'
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Auth>
          <Switch>
            <Route exact path="/invitation/:id">
              <Invitacion/>
            </Route>
            <Dashboard>
              <Route exact path="/">
                <Tareas />
              </Route>
              <Route exact path="/colaboradores">
                <Colaboradores />
              </Route>
              <Route exact path="/clientes">
                <Clientes />
              </Route>
              <Route exact path="/perfildepuestos">
                <Perfil>
                  <Perfiles />
                </Perfil>
              </Route>
              <Route exact path="/perfildepuestos/nuevoPuesto">
                <Perfil>
                  <NuevoPerfil />
                </Perfil>
              </Route>
              <Route exact path="/perfildepuestos/edtiPuesto">
                <Perfil>
                  <EditPerfil />
                </Perfil>
              </Route>
            </Dashboard>
          </Switch>
        </Auth>
      </Router>
    </Provider>
  );
}

export default App;
