import React from 'react';

const NuevoPedido = (props) => {
    const id = props.match.params
    console.log(id);
    return ( 
        <h2>Nuevo Pedido</h2>
     );
}
 
export default NuevoPedido;