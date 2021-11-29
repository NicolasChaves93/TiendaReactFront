import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import {Navigate} from  'react-router-dom'
import swal from 'sweetalert';

class Proveedores extends Component {
    state = {
        proveedores:[]
    }

    componentWillMount(){
        this.getProveedores();
    }

    getProveedores = () =>{
        axios.get("http://localhost:8080/api/proveedores/")
        .then(res => {
            console.log(res.data);
            this.setState({
                proveedores: res.data
            })
        });
    }

    borrarProveedor = (id) =>{
        axios.delete("http://localhost:8080/api/proveedores/proveedor/"+id)
        .then(res=>{
            this.setState({
                proveedores: res.data,
                status: "deleted"
            })
            swal("Proveedor eliminado",
            "El proveedor ha sido eliminado correctamente",
            "success"
            );
            window.location.reload(true);
        })
    }
    render(){
        if(this.state.status === "deleted"){
            return <Navigate to = "/proveedores" />
        }
        return(
            <div className="text-center">
                <h1 className='title'>PROVEEDORES</h1>
                <Link className="btn btn-success justify-content-center" to = "/agregarProveedor">Agregar Proveedor</Link>
                <table className="table table-hover table-md table-bordered">
                    <thead className="table-success">
                        <tr>
                            <th>Nombre Proveedor</th>
                            <th>Nit </th>
                            <th>Direccion</th>
                            <th>Ciudad</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.proveedores.map((proveedor) =>{
                                return(
                                    <React.Fragment>
                                        <tr>
                                            <td>{proveedor.nombre_prov}</td>
                                            <td>{proveedor.nit}</td>
                                            <td>{proveedor.dirección}</td>
                                            <td>{proveedor.ciudad}</td>
                                            <td>{proveedor.telefono}</td>
                                            <td>
                                            <Link style={{width: "70px", margin: "5px"}} className="btn btn-outline-primary btn-sm" to = {"/editarProveedor/"+proveedor._id}>Editar</Link>
                                                <button style={{width: "70px"}} className="btn btn-outline-danger btn-sm" onClick = {
                                                    ()=>{
                                                        this.borrarProveedor(proveedor._id)
                                                    }
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
}

export default Proveedores;