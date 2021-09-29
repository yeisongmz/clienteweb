import React, {Fragment} from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** Layout */
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

/**Components */
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
/* Productos */
import Productos from './components/productos/Productos';
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from './components/productos/EditarProducto';
/* Pedidos */
import Pedidos from './components/pedidos/Pedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';

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
          <Route exact path="/clientes/nuevo" component={NuevoCliente}/>
          <Route exact path="/clientes/editar/:id" component={EditarCliente}/>

          <Route exact path="/productos" component={Productos}/>
          <Route exact path="/productos/nuevo" component={NuevoProducto}/>
          <Route exact path="/productos/editar/:id" component={EditarProducto}/>
          
          <Route exact path="/Pedidos" component={Pedidos}/>
          <Route exact path="/Pedidos/nuevo/:id" component={NuevoPedido}/>
          
        </Switch>
      </main>
      </div>
      
    </Fragment>
    </Router>
  );
}

export default App;
