import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import clienteAxios from "../../config/axios";


const NuevoCliente = ({history}) => {

    // state de cliente
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    });

    // ller los datos del formulario
    const actualizarState = e =>{
        
        guardarCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
        //console.log(cliente);
    }

    // agregarCliente rest api
    const agregarCliente = e=>{
        e.preventDefault();
        // enviar peticion a axios
        clienteAxios.post('clientes', cliente)
            .then(res =>{
                // validar si hay errores de mongo
                if (res.data.code === 11000 ){
                    console.log('El correo ingresado ya está registrdo')
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliente ya está registrado'
                    });
                    
                }else{
                    console.log(res.data);
                    Swal.fire(
                        'Se agregó el cliente',
                        res.data.mensaje,
                        'success'
                    );
                    //redireccionar
                    history.push('/');
                }
                
                
                
            })

    }

    //validar formulario
    const validarCliente = ()=>{
        const {nombre, apellido, empresa, telefono, email} = cliente;
        // revisar que las propiedades 
        let valido = !nombre.length || !apellido.length || !empresa.length || !telefono.length || !email.length;

        return valido;
    }

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>
      <form
        onSubmit={agregarCliente}
      >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Cliente" 
            name="nombre" 
            onChange={actualizarState}/>
            
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input type="text" 
                 placeholder="Apellido Cliente" 
                 name="apellido" 
                 onChange={actualizarState} 
                 />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input type="text" 
                 placeholder="Empresa Cliente" 
                 name="empresa" 
                 onChange={actualizarState}
                 />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" 
                 placeholder="Email Cliente" 
                 name="email" 
                 onChange={actualizarState}
                 />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input type="tel" 
                 placeholder="Teléfono Cliente" 
                 name="telefono" 
                 onChange={actualizarState}
                 />
        </div>

        <div className="enviar">
          <input
            style={styles.botonAgregar}
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

const styles = {
  botonAgregar: {
    backgroundColor: "Chartreuse",
  },
};

// HOC  es una funcion que toma un componente y retorna un componente
export default withRouter(NuevoCliente);
