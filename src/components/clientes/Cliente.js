import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Cliente = ({cliente, consultarApi}) => {
    const {_id, nombre, apellido, empresa, email, telefono} = cliente;

    //eliminar cient
    const eliminarCliente = idCliente =>{
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Esta operacion ya no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                // llamado a axios
                clienteAxios.delete(`/clientes/${idCliente}`)
                .then(res=>{
                    Swal.fire(
                        'Eliminado!',
                        res.data.mensaje,
                        'success'
                      );
                    // llamar a la bd
                    consultarApi();

                })
              
            }
          })
    }

    return ( 
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{nombre} {apellido}</p>
                        <p className="empresa">{empresa}</p>
                        <p>correo: {email}</p>
                        <p>telefono: {telefono}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${_id}`} style={styles.botonEditar} cliente={cliente} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>
                        <button 
                            type="button" 
                            style={styles.botonEliminar} 
                            className="btn btn-rojo btn-eliminar"
                            onClick={()=>eliminarCliente(_id)}
                            >
                            
                            
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
     );
}
 

const styles = {
    botonEditar: {
        backgroundColor: 'Cyan'
    },
    botonEliminar: {
        backgroundColor: 'pink'
    }
    
}

export default Cliente;