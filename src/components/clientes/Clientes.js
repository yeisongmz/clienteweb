import React,{useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import Cliente from './Cliente';

const Clientes = () => {

    const [clientes, setClientes] = useState([]);

    const consultarApi = async ()  =>{
        const clientesApi = await clienteAxios.get('/clientes');
        setClientes(clientesApi.data);
    }

    useEffect(()=>{
        
        consultarApi();
    }, [])

        // Spinner de carga
        if (!clientes.length) return <Spinner/>

    return ( 
        <Fragment>
            <h2>Clientes</h2>
            <Link to="/clientes/nuevo" style={styles.botonAgregar} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
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