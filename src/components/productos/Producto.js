import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Producto = ({producto, consultarApi}) => {
    const {_id, nombre, precio, imagen} = producto;
    //eliminar cient
    const eliminarProducto = idProducto =>{
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
                clienteAxios.delete(`/productos/${idProducto}`)
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
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio}</p>
                { imagen ? (
                    <img src={`http://localhost:5000/${imagen}`} alt="imagen" />
                ) : null }
            </div>
            <div className="acciones">
                <Link 
                    to={`/productos/editar/${_id}`} 
                    className="btn btn-azul"
                    style={styles.botonEditar}
                >
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={()=>eliminarProducto(_id)}
                    style={styles.botonEliminar}
                    >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
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

export default Producto;