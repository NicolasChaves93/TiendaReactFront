import axios from 'axios';
import React, { Component } from 'react'
import {Navigate} from  'react-router-dom'
import { Link } from "react-router-dom";

export default class editarCliente extends Component {
    clienteId = null;
    path = null;
    url = [];
    cedula = React.createRef();
    nombre = React.createRef();
    dirección = React.createRef();
    telefono = React.createRef();
    email = React.createRef();

    state = {
        cliente: [],
        status : null
    }

    componentWillMount(){
        this.path = window.location.pathname;
        this.url = this.path.split("/");
        this.clienteId = this.url[2];
        this.getCliente(this.clienteId);
    }

    getCliente = (id) =>{
        axios.get("http://localhost:8080/api/clientes/cliente/"+id)
        .then(res => {
            if(res.data){
                console.log(res.data);
                this.setState({
                    cliente: res.data
                })
            }else{
                console.log("No hay datos")
            }
        });
    }

    recibirFormulario = (e) =>{
        e.preventDefault();
        var cliente = {
            _id: this.clienteId,
            cedula: this.cedula.current.value,
            nombre: this.nombre.current.value,
            dirección: this.dirección.current.value,
            telefono: this.telefono.current.value,
            email: this.email.current.value,
        }


        axios.put("http://localhost:8080/api/clientes/cliente/"+this.clienteId,cliente)
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
            return <Navigate to = "/clientes" />
        }
        return(
            <div>
                <h1 className='title'>Editar Cliente</h1>
                <form onSubmit={this.recibirFormulario}>
                    <table className="table table-borderless">
                    <tr>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="cedula" ref = {this.cedula} className="form-control" placeholder="Cedula del Cliente" aria-label="cedula" aria-describedby="button-addon2" defaultValue={this.state.cliente.cedula}/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="nombre" ref = {this.nombre} className="form-control" placeholder="Nombre del Cliente" aria-label="nombre" aria-describedby="button-addon2" defaultValue={this.state.cliente.nombre}/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="dirección" ref = {this.dirección} className="form-control" placeholder="Direccion" aria-label="dirección" aria-describedby="button-addon2" defaultValue={this.state.cliente.dirección}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="telefono" ref = {this.telefono} className="form-control" placeholder="Telefono" aria-label="telefono" aria-describedby="button-addon2" defaultValue={this.state.cliente.telefono}/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="email" ref = {this.email} className="form-control" placeholder="Correo Electronico" aria-label="email" aria-describedby="button-addon2" defaultValue={this.state.cliente.email}/>
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
