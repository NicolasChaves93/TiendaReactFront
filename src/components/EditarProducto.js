import axios from 'axios';
import React, { Component } from 'react'
import {Navigate} from  'react-router-dom'

export default class EditarProducto extends Component {
    productoId = null;
    path = null;
    url = [];
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

    componentWillMount(){
        this.path = window.location.pathname;
        this.url = this.path.split("/");
        this.productoId = this.url[2];
        this.getProductos(this.productoId);
    }

    getProductos = (id) =>{
        axios.get("http://localhost:8080/api/productos/prodcuto/"+id)
        .then(res => {
            if(res.data){
                console.log(res.data);
                this.setState({
                    producto: res.data
                })
            }else{
                console.log("No hay datos")
            }
        });
    }

    recibirFormulario = (e) =>{
        e.preventDefault();
        var producto = {
            _id: this.productoId,
            codigo_producto: this.codigo.current.value,
            nombre_producto: this.producto.current.value,
            nitproveedor: this.nit.current.value,
            precio_compra: this.precioCompra.current.value,
            iva_compra: this.iva.current.value,
            precio_venta: this.precioVenta.current.value,
        }


        axios.put("http://localhost:8080/api/productos/producto/"+this.productoId,producto)
        .then(res=>{
            if(res.data){
                this.setState({
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
                <h1 className='title'>Editar Producto</h1>
                <form onSubmit={this.recibirFormulario}>
                <div>
                    <label>Codigo del producto</label>
                    <input type = "text" name="codigo" ref = {this.codigo} defaultValue={this.state.producto.codigo_producto}/>
                </div>
                <div>
                    <label>Producto</label>
                    <input type = "text" name="producto" ref = {this.producto} defaultValue={this.state.producto.nombre_producto}/>
                </div>
                <div>
                    <label>Nit Provedor</label>
                    <input type = "text" name="nit" ref = {this.nit} defaultValue={this.state.producto.nitproveedor}/>
                </div>
                <div>
                    <label>Precio compra</label>
                    <input type = "text" name="precioCompra" ref =  {this.precioCompra} defaultValue={this.state.producto.precio_compra}/>
                </div>
                <div>
                    <label>IVA</label>
                    <input type = "text" name="iva" ref = {this.iva} defaultValue={this.state.producto.iva_compra}/>
                <div>
                    <label>Precio Venta</label>
                    <input type = "text" name="precioVenta" ref = {this.precioVenta} defaultValue={this.state.producto.precio_venta}/>
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
