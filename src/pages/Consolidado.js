import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import {Navigate} from  'react-router-dom'
import swal from 'sweetalert';
import Ventas from './Ventas';

class consolidado extends Component {
    state = {
        consolidado:[]
    }

    componentWillMount(){
        this.getProductos();
    }

    getProductos = () =>{
        axios.get("http://localhost:8080/api/ventas/")
        .then(res => {
            console.log(res.data);
            this.setState({
                consolidado: res.data
            })
        });
    }


    render(){
        if(this.state.status === "deleted"){
            return <Navigate to = "/ventas" />
        }
        return(
            <div className="text-center">
                <h1 className='title'>Ventas</h1>
                <table className="table table-hover table-md table-bordered">
                    <thead className="table-success">
                        <tr>
                            <th>Código Producto</th>
                            <th>Nombre Producto</th>
                            <th>Nit Provedor</th>
                            <th>Precio de venta</th>
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

export default Ventas;