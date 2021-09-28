import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import clienteAxios from "../../config/axios";


const EditarCliente = (props) => {
    
    // obtener id
    const {id} = props.match.params;
    // state de cliente
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    });
    // query a la api
    const consultarApi = async ()=>{
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        //colocar en el state
        datosCliente(clienteConsulta.data);
    }
    //useEffect, cuando el componente carga
    useEffect(()=>{
        consultarApi();
    },[])

    // ller los datos del formulario
    const actualizarState = e =>{
        
        datosCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    // actualizarCliente envia una peticion por axios para actualizar un cliente
    const actualizarCliente = e=>{
        e.preventDefault();
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res=>{
                console.log(res);
                // validar si hay errores de mongo
                if (res.data.code === 11000 ){
                    console.log('El correo ingresado ya está registrdo')
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliente ya está registrado'
                    });
                    
                }else{
                    //console.log(res.data);
                    Swal.fire(
                        'Correcto',
                        'Se actualizó correctamente',
                        'success'
                    );
                    //redireccionar
                    props.history.push('/');
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
      <h2>Editar el Cliente</h2>
      <form
        onSubmit={actualizarCliente}
      >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Cliente" 
            name="nombre" 
            onChange={actualizarState}
            value={cliente.nombre}
            />
            
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input type="text" 
                 placeholder="Apellido Cliente" 
                 name="apellido" 
                 onChange={actualizarState}
                 value={cliente.apellido}
                 />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input type="text" 
                 placeholder="Empresa Cliente" 
                 name="empresa" 
                 onChange={actualizarState}
                 value={cliente.empresa}
                 />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" 
                 placeholder="Email Cliente" 
                 name="email" 
                 onChange={actualizarState}
                 value={cliente.email}
                 />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input type="tel" 
                 placeholder="Teléfono Cliente" 
                 name="telefono" 
                 onChange={actualizarState}
                 value={cliente.telefono}
                 />
        </div>

        <div className="enviar">
          <input
            style={styles.botonAgregar}
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios "
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
export default withRouter(EditarCliente);
