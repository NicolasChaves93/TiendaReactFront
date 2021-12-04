import React, { Component } from 'react'
import axios from 'axios';
import AddProductos from '../components/AddProductos';

class Ventas extends Component {

    state = {
        clientes:[],
        productos:[],
        ventas:[],
        status: false
    }

    componentWillMount(){
        this.getCliente();
        this.getProductos();
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

    /* Función para consumir la API y traer los productos */
    getProductos = () =>{
        axios.get("http://localhost:8080/api/productos/")
        .then(res => {
            console.log(res.data);
            this.setState({
                productos: res.data
            })
        });
    }

    /* Función que me guarda el nombre del cliente obtenido desde el select */
    handleChangeCli = (c) =>{
        this.setState({
            nombre: c.target.value
        })
    }

    /* Agrega un producto a la venta */
    addProducto = () =>{
        console.log(this.state.ventas.length)
        let newProducto = <AddProductos id = {this.state.ventas.length}
                                        productos={this.state.productos} 
                                        deleteProducto={this.deleteProducto} 
                                        key={this.state.ventas.length}
                          />
        if(this.state.status){
            this.setState({
                ventas:[...this.state.ventas, newProducto]
            })
        }else{
            this.setState({
                ventas:[...this.state.ventas, newProducto],
                status: true
            })
        }
    }

    /* Eliminar un producto de la venta */
    deleteProducto = (id) =>{
        console.log(id)
        const deleteP = this.state.ventas.filter(venta => venta.id !== id);
        console.log(deleteP);
    }

    render(){
        return (
            <div>
                <h1 className='title'>Ventas</h1>
                <form className ="table">
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label for="inputNombre">Cedula</label>
                            <select name = "clientes" className ="form-control" id="inputNombre" onChange = {this.handleChangeCli} required>
                                    <option></option>
                                    {this.state.clientes.map(c=>(
                                        <option key={c.id} value={c.nombre}>{c.cedula}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label for="inputCliente">Cliente</label>
                            <input type="text" name="cliente" className="form-control" id="inputCliente" aria-label="cliente" aria-describedby="button-addon2" defaultValue={this.state.nombre} disabled/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label for="inputConsec">Consecutivo</label>
                            <input type="text" className="form-control" id="inputConsec" name="consecutivo" aria-describedby="button-addon2" disabled/>
                        </div>
                    </div>
                    {this.state.status ?
                     this.state.ventas.map(r =>(r))
                    : <></>}
                    <div>
                        <button className="btn btn-sm btn-success" onClick = {this.addProducto}>+</button>
                    </div>
                    <div></div>
                    <hr></hr>
                    <div ></div>
                    {this.state.status ?
                    <div style={{margin: "10px"}}>
                        <div className="form-row">
                            <div className="col-md-2 mb-2"></div>
                            <div className="col-md-4 mb-3"></div>
                            <div className="col-md-2 mb-2">
                                <label for="inputCant">Total Venta</label>
                            </div>
                            <div className="col-md-3 mb-3">
                                <input type="text" name="totalVentas" className="form-control" id="inputtotalVentas" aria-label="totalVentas" aria-describedby="button-addon2" disabled/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-2 mb-2"></div>
                            <div className="col-md-4 mb-3"></div>
                            <div className="col-md-2 mb-2">
                                <label for="inputCant">Total IVA</label>
                            </div>
                            <div className="col-md-3 mb-3">
                                <input type="text" name="totalIva" className="form-control" id="inputtotalIva" aria-label="totalIva" aria-describedby="button-addon2" disabled/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-2 mb-2"></div>
                            <div className="col-md-4 mb-3"></div>
                            <div className="col-md-2 mb-2">
                                <label for="inputCant">Total con IVA</label>
                            </div>
                            <div className="col-md-3 mb-3">
                                <input type="text" name="totalconIva" className="form-control" id="inputtotalconIva" aria-label="totalconIva" aria-describedby="button-addon2" disabled/>
                            </div>
                        </div>

                        <div className="col text-center">
                            <button className="btn btn-lg btn-primary" type="submit">Comfirmar</button>
                        </div>
                    </div>
                    : <></>}
                </form>
            </div>
        )
    }

}
export default Ventas;