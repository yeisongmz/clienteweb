import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import clienteAxios from "../../config/axios";
import Spinner from '../layout/Spinner';

const EditarProducto = (props) => {
  const { id } = props.match.params;

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  const [archivo, setArchivo] = useState("");

  const consultarApi = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);
    setProducto(productoConsulta.data);
    //console.log(productoConsulta);
  };

  useEffect(() => {
    consultarApi();
  }, []);

  // ller los datos del formulario
  const leerInformacionProducto = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };
  const leerArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const editarPRoducto = async (e) => {
    e.preventDefault();

    // crea un formulario
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);

    // almacenar en la bd
    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          "Content-Type": "multipar/form-data",
        },
      });

      if (res.status === 200) {
        Swal.fire("Editado correctamente", res.data.mensaje, "success");
      }

      //redireccionar
      props.history.push("/productos");
    } catch (error) {
      console.log(error);
      //lanzar alerta
      Swal.fire({
        type: "error",
        title: "hubo un error",
        text: "vuelva a intentarlo",
      });
    }
  };

  const { nombre, imagen } = producto;
 
  if(!nombre) return <Spinner />

  return (
    <Fragment>
      <h2>Editar Producto</h2>

      <form onSubmit={editarPRoducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
            defaultValue={producto.nombre}
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
            defaultValue={producto.precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
            <img
              src={`http://localhost:5000/${imagen}`}
              alt="imagen"
              width="300"
            />
          ) : null}
          <input
            type="file"
            name="imagen"
            onChange={leerArchivo}
            //defaultValue={producto.imagen}
          />
        </div>

        <div className="enviar">
          <input
            style={styles.botonAgregar}
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
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
export default withRouter(EditarProducto);
