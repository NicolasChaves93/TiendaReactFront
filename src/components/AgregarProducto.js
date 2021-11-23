import axios from 'axios';
import React, { Component } from 'react'
import {Navigate} from  'react-router-dom'

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
                <div>
                    <label>Codigo del producto</label>
                    <input type = "text" name="codigo" ref = {this.codigo}/>
                </div>
                <div>
                    <label>Producto</label>
                    <input type = "text" name="producto" ref = {this.producto}/>
                </div>
                <div>
                    <label>Nit Provedor</label>
                    <input type = "text" name="nit" ref = {this.nit}/>
                </div>
                <div>
                    <label>Precio compra</label>
                    <input type = "text" name="precioCompra" ref =  {this.precioCompra}/>
                </div>
                <div>
                    <label>IVA</label>
                    <input type = "text" name="iva" ref = {this.iva}/>
                <div>
                    <label>Precio Venta</label>
                    <input type = "text" name="precioVenta" ref = {this.precioVenta}/>
                </div>
                <div>
                    <input type = "Submit" />
                </div>
                </div>
            </form>
            </div>
        )
    }
}

export default AgregarProducto;