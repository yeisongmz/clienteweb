import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import clienteAxios from "../../config/axios";

const NuevoProducto = ({history}) => {

    // state 
    const [producto, setProducto] = useState({
        nombre: '',
        precio: ''
    });
    // state para guardar la imagen del producto
    const [archivo, setArchivo] = useState('');

    // ller los datos del formulario
    const leerInformacionProducto = e =>{
        
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
       
    }
    const leerArchivo = e =>{
        
        setArchivo(e.target.files[0])
       
    }

    
    const agregarProducto = async e=>{
        e.preventDefault();

        // crea un formulario
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // almacenar en la bd
        try {
           const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type' : 'multipar/form-data'
                }
            });

            if(res.status === 200){
                Swal.fire(
                    'Agregado correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            //redireccionar
            history.push('/productos');
        } catch (error) {
            console.log(error);
            //lanzar alerta
            Swal.fire({
                type: 'error',
                title: 'hubo un error',
                text: 'vuelva a intentarlo'
            })
        }
    }

    //validar formulario
    const validarProducto = ()=>{
        const {nombre, precio} = producto;
        // revisar que las propiedades 
        let valido = !nombre.length || !precio.length || !archivo;

        return valido;
    }
    return ( 
        <Fragment>
      <h2>Nuevo Producto</h2>

<form
    onSubmit={agregarProducto}
>
    <legend>Llena todos los campos</legend>

    <div className="campo">
        <label>Nombre:</label>
        <input 
            type="text" 
            placeholder="Nombre Producto" 
            name="nombre"
            onChange={leerInformacionProducto}
            />
    </div>

    <div className="campo">
        <label>Precio:</label>
        <input 
            type="number" 
            name="precio" 
            min="0.00" 
            step="0.01" 
            placeholder="Precio"
            onChange={leerInformacionProducto}
            />
    </div>

    <div className="campo">
        <label>Imagen:</label>
        <input 
            type="file"  
            name="imagen"
            onChange={leerArchivo}
            />
    </div>

    <div className="enviar">
            <input 
                style={styles.botonAgregar}
                type="submit" 
                className="btn btn-azul" 
                value="Agregar Producto"
                disabled={validarProducto()}
                />
    </div>
</form>
    </Fragment>
     );
}
 
const styles = {
    botonAgregar: {
      backgroundColor: "Chartreuse",
    },
  };
export default withRouter(NuevoProducto);