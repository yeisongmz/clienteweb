import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Producto from "./Producto";
import clienteAxios from "../../config/axios";
import Spinner from "../layout/Spinner";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const consultarApi = async () => {
    const productosApi = await clienteAxios.get("/productos");
    setProductos(productosApi.data);
  };

  useEffect(() => {
    consultarApi();
  }, []);

  // Spinner de carga
  if (!productos.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Productos</h2>
      <Link
        to={"/productos/nuevo"}
        style={styles.botonAgregar}
        className="btn btn-verde nvo-cliente"
      >
        <i className="fas fa-plus-circle"> </i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto
            key={producto._id}
            producto={producto}
            consultarApi={consultarApi}
          />
        ))}
      </ul>
    </Fragment>
  );
};
const styles = {
  botonAgregar: {
    backgroundColor: "Chartreuse",
  },
};

export default Productos;
