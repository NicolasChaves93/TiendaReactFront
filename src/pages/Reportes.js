import React, { Component } from 'react'
import axios from 'axios';
import ListClientes from '../components/ListClientes';
import VentaCliente from '../components/VentaCliente';

class Reportes extends Component {
    componentWillMount(){
        this.getClientes();
    }

    state = {
        clientes:[],
        isList: false,
        isVenta: false,
        totalV: 0
    }

    /* Función para consumir la API y traer los clientes */
    getClientes = () =>{
        axios.get("http://localhost:8080/api/clientes/")
        .then(res => {
            console.log(res.data);
            this.setState({
                clientes: res.data
            })
        });
    }

    /*Mostrar lista de clientes */
    listClick = (e) =>{
        const name = e.target.name;
        this.setState(state =>({
            isList: !state.isList
        }))
        if(this.state.isList){
            document.getElementById([name]).className = "btn btn-outline-info";
        }else{
            document.getElementById([name]).className = "btn btn-info";
        }
    }

    /* Mostrar venta de clientes */
    listVenta = (e) =>{
        const name = e.target.name;
        this.setState(state =>({
            isVenta: !state.isVenta,
            totalV: 0
        }))
        if(this.state.isVenta){
            document.getElementById([name]).className = "btn btn-outline-info";
        }else{
            document.getElementById([name]).className = "btn btn-info";
        }
    }

    sumarVentas = (venta) =>{
        this.setState({
            totalV: this.state.totalV + venta
        })

    }

    render(){
        return (
            <div className="text-center">
                <h2 className='title'>REPORTES</h2>
                <button type="button" name="listBoton" id="listBoton" className="btn btn-outline-info justify-content-center" onClick={this.listClick} >Listado de Clientes</button>
                <span></span>
                <button type="button" name="ventaBoton" id="ventaBoton" className="btn btn-outline-info justify-content-center" onClick={this.listVenta}>Ventas por Cliente</button>

                {this.state.isList ?
                <div>
                    <hr></hr>
                    <ListClientes key = {0} clientes={this.state.clientes} />
                </div>
                : <></>
                }

                {this.state.isVenta ?
                <div>
                    <hr></hr>
                    <div className="text-center">
                        <h4>Total de Ventas por Cliente</h4 >
                    </div>
                    <table className="table table-hover  table-md table-bordered">
                        <thead className="table-success">
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre Completo</   th>
                                <th>Valor Total Ventas</th>
                            </tr>
                        </thead>
                        {this.state.clientes.map((c,index)=>(
                            <VentaCliente key={index} cliente={c} sumarVentas={this.sumarVentas} />
                        ))}
                    </table>
                    <span></span>
                    <div className="form-row">
                        <div className="col-md-2 mb-2"></div>
                        <div className="col-md-4 mb-4"></div>
                        <div className="col-md-2 mb-2">
                            <label for="inputCant">Total Ventas $</label>
                        </div>
                        <div className="col-md-2 mb-2">
                            <input type="numeric" name="totalVentas" className="form-control" id="inputtotalV" aria-label="totalVentas" aria-describedby="button-addon2"  value={this.state.totalV} disabled/>
                        </div>
                    </div>
                </div>
                : <></>
                }
            </div>
        )
    }

} export default Reportes;