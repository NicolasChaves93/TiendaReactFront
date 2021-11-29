import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import {Navigate} from  'react-router-dom'
import swal from 'sweetalert';

class Clientes extends Component {
    state = {
        clientes:[]
    }

    componentWillMount(){
        this.getCliente();
    }

    /* Función para consumir la API y traer los clientes */
    getCliente = () =>{
        axios.get("http://localhost:8080/api/clientes/")
        .then(res => {
            console.log(res.data);
            this.setState({
                clientes: res.data
            })
        });
    }

    /* Función para consumir la API y eliminar un cliente por Id */
    borrarCliente = (id) =>{
        axios.delete("http://localhost:8080/api/clientes/cliente/"+id)
        .then(res=>{
            this.setState({
                productos: res.data,
                status: "deleted"
            })
            swal("Articulo eliminado",
            "El articulo ha sido eliminado correctamente",
            "success"
            );
            window.location.reload(true);
        })
    }
    render(){
        if(this.state.status === "deleted"){
            return <Navigate to = "/clientes" />
        }
        return(
            <div className="text-center">
                <h1 className='title'>CLIENTES</h1>
                <Link className="btn btn-success justify-content-center" to = "/agregarCliente">Agregar Cliente</Link>
                <table className="table table-hover  table-md table-bordered">
                    <thead className="table-success">
                        <tr>
                            <th>Cédula</th>
                            <th>Nombre Completo</   th>
                            <th>Dirección</th>
                            <th>Télefono</th>
                            <th>Correo Electrónico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.clientes.map((cliente) =>{
                                return(
                                    <React.Fragment>
                                        <tr>
                                            <td>{cliente.cedula}</td>
                                            <td>{cliente.nombre}</td>
                                            <td>{cliente.dirección}</td>
                                            <td>{cliente.telefono}</td>
                                            <td>{cliente.email}</td>
                                            <td>
                                                {/* Boton Editar */}
                                                <Link style={{width: "70px", margin: "5px"}} className="btn btn-outline-primary btn-sm" to = {"/EditarCliente/"+cliente._id}>Editar</Link>
                                                {/* Boton Eliminar */}
                                                <button style={{width: "70px"}} className="btn btn-outline-danger btn-sm" onClick = {
                                                    ()=>{this.borrarCliente(cliente._id)}
                                                }>Eliminar</button>
                                            </td>
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
} export default Clientes;