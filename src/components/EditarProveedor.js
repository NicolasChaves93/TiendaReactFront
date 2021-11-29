import axios from 'axios';
import React, { Component } from 'react'
import {Navigate} from  'react-router-dom'
import { Link } from "react-router-dom";

export default class EditarProducto extends Component {
    proveedorId = null;
    path = null;
    url = [];
    nombre = React.createRef();
    nit = React.createRef();
    direccion = React.createRef();
    ciudad = React.createRef();
    telefono = React.createRef();

    state = {
        proveedor: [],
        status : null
    }

    componentWillMount(){
        this.path = window.location.pathname;
        this.url = this.path.split("/");
        this.proveedorId = this.url[2];
        this.getProovedores(this.proveedorId);
    }

    /* Funcion que consume la API y me trae el Proveedor para un Id especifico */
    getProovedores = (id) =>{
        axios.get("http://localhost:8080/api/proveedores/proveedor/"+id)
        .then(res => {
            if(res.data){
                console.log(res.data);
                this.setState({
                    proveedor: res.data
                })
            }else{
                console.log("No hay datos")
            }
        });
    }

    recibirFormulario = (e) =>{
        e.preventDefault();
        var proveedor = {
            _id: this.proveedorId,
            nombre_prov: this.nombre.current.value,
            nit: this.nit.current.value,
            dirección: this.direccion.current.value,
            ciudad: this.ciudad.current.value,
            telefono: this.telefono.current.value
        }


        axios.put("http://localhost:8080/api/proveedores/proveedor/"+this.proveedorId,proveedor)
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
            return <Navigate to = "/proveedores" />
        }
        return(
            <div>
                <h1 className='title'>Editar Proveedor</h1>
                <form onSubmit={this.recibirFormulario}>
                    <table className="table table-borderless">
                    <tr>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="nombre" ref = {this.nombre} className="form-control" placeholder="Nombre del Proveedor" aria-label="nombre" aria-describedby="button-addon2" defaultValue={this.state.proveedor.nombre_prov}/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="nit" ref = {this.nit} className="form-control" placeholder="Nit" aria-label="nit" aria-describedby="button-addon2" defaultValue={this.state.proveedor.nit}/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="direccion" ref = {this.direccion} className="form-control" placeholder="Dirección" aria-label="direccion" aria-describedby="button-addon2" defaultValue={this.state.proveedor.dirección}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                    <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="ciudad" ref = {this.ciudad} className="form-control" placeholder="Ciudad" aria-label="ciudad" aria-describedby="button-addon2" defaultValue={this.state.proveedor.ciudad}/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="telefono" ref = {this.telefono} className="form-control" placeholder="Teléfono" aria-label="telefono" aria-describedby="button-addon2" defaultValue={this.state.proveedor.telefono}/>
                            </div>
                        </td>
                    </tr>
                    </table>
                    <div className="col text-center"  >
                        <button style={{ width: "120px", margin: "5px"}} className="btn btn-lg btn-primary" type = "Submit" >Guardar</button>
                        <Link style={{width: "120px", margin: "5px"}} className="btn btn-lg btn btn-danger" to = "/proveedores/">Volver</Link>
                    </div>
            </form>
            </div>
        )
    }
}
