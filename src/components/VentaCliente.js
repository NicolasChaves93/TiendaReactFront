import React, { Component } from 'react'
import axios from 'axios';

class VentaCliente extends Component {
    componentWillMount(){
        this.getVentas();
    }

    state = {
        ventas:[],
        sumaVenta:0
    }

    /* Función para consumir la API y traer los clientes */
    getVentas = () =>{
        axios.get("http://localhost:8080/api/ventas/")
        .then(res => {
            this.sumaVenta(res.data)
            this.setState({
                ventas: res.data
            })
        });

    }

    sumaVenta = (valor) =>{
        const ventas = valor.filter(v => v.cedula_cliente === this.props.cliente.cedula)
        ventas.map(v=>(
            this.setState({
                sumaVenta: this.state.sumaVenta + v.total_venta
            })
        ))

        ventas.map(v=>(
            this.props.sumarVentas(v.total_venta)
        ))
    }

    render(){
        return (
            <tbody>
                <tr>
                    <td>{this.props.cliente.cedula}</td>
                    <td>{this.props.cliente.nombre}</td>
                    <td>{this.state.sumaVenta}</td>
                </tr>
            </tbody>
        )
    }

} export default VentaCliente;