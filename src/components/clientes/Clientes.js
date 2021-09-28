import React,{useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios'
import { Link } from 'react-router-dom';

import Cliente from './Cliente';

const Clientes = () => {

    const [clientes, setClientes] = useState([]);

    const consultarApi = async ()  =>{
        const clientesApi = await clienteAxios.get('/clientes');
        setClientes(clientesApi.data);
        
        //console.log(clientes);
    }

    useEffect(()=>{
        consultarApi();
    }, [])

    return ( 
        <Fragment>
            <h2>Clientes</h2>
            <Link to="/cliente/nuevo" style={styles.botonAgregar} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {clientes.map(cliente => ( 
                    <Cliente 
                        key={cliente._id} 
                        cliente={cliente}
                        consultarApi={consultarApi}
                        />
                ))}
            </ul>
        </Fragment>
     );
}

const styles = {
    botonAgregar: {
        backgroundColor: 'Chartreuse'
    }
}

export default Clientes;