import axios from 'axios';
import React, { Component } from 'react'
import {Navigate} from  'react-router-dom'
import { Link } from "react-router-dom";

class AgregarProducto extends Component {
    codigo = React.createRef();
    producto = React.createRef();
    nit = React.createRef();
    precioCompra = React.createRef();
    iva = React.createRef();
    precioVenta = React.createRef();

    state = {
        producto: [],
        status : null
    }

    recibirFormulario = (e) =>{
        e.preventDefault();
        var producto = {
            codigo_producto: this.codigo.current.value,
            nombre_producto: this.producto.current.value,
            nitproveedor: this.nit.current.value,
            precio_compra: this.precioCompra.current.value,
            iva_compra: this.iva.current.value,
            precio_venta: this.precioVenta.current.value,

        }
        console.log(producto);
        this.setState({
            producto: producto
        })

        console.log(this.state.producto.codigo_producto);

        axios.post("http://localhost:8080/api/productos/producto",producto)
        .then(res=>{
            if(res.data){
                this.setState({
                    producto:res.data,
                    status: "sucess"
                })
            }
        })
    }
    render(){
        if(this.state.status === "sucess"){
            return <Navigate to = "/productos" />
        }
        return(
            <div>
                <h1 className='title'>Agregar Producto</h1>
                <form onSubmit={this.recibirFormulario}>
                    <table className="table table-borderless">
                    <tr>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="codigo" ref = {this.codigo} className="form-control" placeholder="Codigo del producto" aria-label="codigo" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="producto" ref = {this.producto} className="form-control" placeholder="Producto" aria-label="producto" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="nit" ref = {this.nit} className="form-control" placeholder="Nit Provedor" aria-label="nit" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="precioCompra" ref = {this.precioCompra} className="form-control" placeholder="Precio compra" aria-label="precioCompra" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="iva" ref = {this.iva} className="form-control" placeholder="IVA" aria-label="iva" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="precioVenta" ref = {this.precioVenta} className="form-control" placeholder="Precio Venta" aria-label="precioVenta" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                    </tr>
                    </table>
                    <div className="col text-center"  >
                        <button style={{ width: "120px", margin: "5px"}} className="btn btn-lg btn-primary" type = "Submit" >Guardar</button>
                        <Link style={{width: "120px", margin: "5px"}} className="btn btn-lg btn btn-danger" to = "/productos/">Volver</Link>
                    </div>
            </form>
            </div>
        )
    }
}

export default AgregarProducto;