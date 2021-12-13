import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import {Navigate} from  'react-router-dom'
import swal from 'sweetalert';


class consolidado extends Component {
    state = {
        consolidados:[],
        totalV: 0
    }

    componentWillMount(){
        this.getConsolidado();
    }

    getConsolidado = () =>{
        axios.get("http://localhost:8080/api/consolidado/")
        .then(res => {
            console.log(res.data);
            this.sumaVenta(res.data)
            this.setState({
                consolidados: res.data
            })
        });
    }

    sumaVenta = (valor) =>{
        valor.map(v=>(
            this.setState({
                totalV: this.state.totalV + v.total_ventas
            })
        ))
    }

    render(){
        if(this.state.status === "deleted"){
            return <Navigate to = "/ventas" />
        }
        return(
            <div className="text-center">
                <h1 className='title'>CONSOLIDADO</h1>
                <table className="table table-hover table-md table-bordered">
                    <thead className="table-success">
                        <tr>
                            <th>Ciudad</th>
                            <th>Valor Total Ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.consolidados.map( c=>{
                            return(
                                <React.Fragment>
                                    <tr>
                                        <td>{c.ciudad}</td>
                                        <td>{c.total_ventas}</td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                <span></span>
                <div className="form-row">
                        <div className="col-md-2 mb-2"></div>
                        <div className="col-md-4 mb-4"></div>
                        <div className="col-md-2 mb-2">
                            <label for="inputCant">Total Ventas Tienda $</label>
                        </div>
                        <div className="col-md-2 mb-2">
                            <input type="numeric" name="totalVentas" className="form-control" id="inputtotalV" aria-label="totalVentas" aria-describedby="button-addon2"  value={this.state.totalV} disabled/>
                        </div>
                    </div>
            </div>
        )

    }
}

export default consolidado;