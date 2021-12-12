import React, { Component } from 'react'
import axios from 'axios';

class ListClientes extends Component {
    componentWillMount(){
        this.getClientes();
    }

    state = {
        ventas:[]
    }

    /* Función para consumir la API y traer las ventas */
    getClientes = () =>{
        axios.get("http://localhost:8080/api/ventas/")
        .then(res => {
            console.log(res.data);
            this.setState({
                ventas: res.data
            })
        });
    }

    render(){
        return (
            <div className="text-center">
                <h4>Listado de Clientes</h4>
                <table className="table table-hover  table-md table-bordered">
                    <thead className="table-success">
                        <tr>
                            <th>Cédula</th>
                            <th>Nombre Completo</   th>
                            <th>Dirección</th>
                            <th>Télefono</th>
                            <th>Correo Electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.clientes.map((cliente) =>{
                                return(
                                    <React.Fragment>
                                        <tr>
                                            <td key={cliente.cedula}>{cliente.cedula}</td>
                                            <td>{cliente.nombre}</td>
                                            <td>{cliente.dirección}</td>
                                            <td>{cliente.telefono}</td>
                                            <td>{cliente.email}</td>
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

} export default ListClientes;