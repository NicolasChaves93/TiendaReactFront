import axios from 'axios';
import React, { Component } from 'react'
import {Navigate} from  'react-router-dom'
import { Link } from "react-router-dom";

class AgregarCliente extends Component {
    cedula = React.createRef();
    nombre = React.createRef();
    dirección = React.createRef();
    telefono = React.createRef();
    email = React.createRef();

    state = {
        cliente: [],
        status : null
    }

    recibirFormulario = (e) =>{
        e.preventDefault();
        var cliente = {
            cedula: this.cedula.current.value,
            nombre: this.nombre.current.value,
            dirección: this.dirección.current.value,
            telefono: this.telefono.current.value,
            email: this.email.current.value,
        }
        console.log(cliente);
        this.setState({
            cliente: cliente
        })

        console.log(this.state.cliente.cedula);

        axios.post("http://localhost:8080/api/clientes/cliente",cliente)
        .then(res=>{
            if(res.data){
                this.setState({
                    cliente:res.data,
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
                <h1 className='title'>Agregar Cliente</h1>
                <form onSubmit={this.recibirFormulario}>
                    <table className="table table-borderless">
                    <tr>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="cedula" ref = {this.cedula} className="form-control" placeholder="Cedula del cliente" aria-label="cliente" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="nombre" ref = {this.nombre} className="form-control" placeholder="Nombre Completo" aria-label="nombre" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="dirección" ref = {this.dirección} className="form-control" placeholder="Direccion" aria-label="dirección" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="number" name="telefono" ref = {this.telefono} className="form-control" placeholder="Telefono" aria-label="telefono" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                        <td>
                            <div className="input-group mb-3" >
                                <input type="text" name="email" ref = {this.email} className="form-control" placeholder="Correo Electronico" aria-label="email" aria-describedby="button-addon2"/>
                            </div>
                        </td>
                    </tr>
                    </table>
                    <div className="col text-center"  >
                        <button style={{ width: "120px", margin: "5px"}} className="btn btn-lg btn-primary" type = "Submit" >Guardar</button>
                        <Link style={{width: "120px", margin: "5px"}} className="btn btn-lg btn btn-danger" to = "/clientes/">Volver</Link>
                    </div>
            </form>
            </div>
        )
    }
}

export default AgregarCliente;