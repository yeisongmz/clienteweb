import React, {Fragment} from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** Layout */
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

/**Components */
import Clientes from './components/clientes/Clientes';
import Pedidos from './components/pedidos/Pedidos';
import Productos from './components/productos/Productos';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';

function App() {
  return (

    <Router>
    <Fragment>
      <Header/>
      <div className="grid contenedor contenido principal">
      <Navegacion/>
      <main className="caja-contenido col-9">
        <Switch>
          <Route exact path="/" component={Clientes}/>
          <Route exact path="/cliente/nuevo" component={NuevoCliente}/>
          <Route exact path="/clientes/editar/:id" component={EditarCliente}/>

          <Route exact path="/Productos" component={Productos}/>
          
          <Route exact path="/Pedidos" component={Pedidos}/>
          
        </Switch>
      </main>
      </div>
      
    </Fragment>
    </Router>
  );
}

export default App;
