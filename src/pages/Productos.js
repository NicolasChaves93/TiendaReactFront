import React, { Component } from 'react'
import axios from 'axios';

class Productos extends Component {
    state = {
        productos:[]
    }

    render(){

        axios.get("http://localhost:8080/api/productos/")
        .then(res => {
            console.log(res.data);
            this.setState({
                productos: res.data
            })
        });
        return(
            <div>
                <h1>Productos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Código Producto</th>
                            <th>Nombre Producto</th>
                            <th>Nit Provedor</th>
                            <th>Precio de compra</th>
                            <th>Iva</th>
                            <th>Precio de venta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.productos.map((producto) =>{
                                return(
                                    <React.Fragment>
                                        <tr>
                                            <td>{producto.codigo_producto}</td>
                                            <td>{producto.nombre_producto}</td>
                                            <td>{producto.nitproveedor}</td>
                                            <td>{producto.precio_compra}</td>
                                            <td>{producto.iva_compra}</td>
                                            <td>{producto.precio_venta}</td>
                                            <td><button>Editar</button><button>Eliminar</button></td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        )

    }
}

export default Productos;