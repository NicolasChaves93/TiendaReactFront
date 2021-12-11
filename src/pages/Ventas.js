import React, { Component } from 'react'
import axios from 'axios';
import AddProductos from '../components/AddProductos';
import swal from 'sweetalert';

class Ventas extends Component {
    state = {
        listClientes:[],
        listProductos:[],
        prod:[],
        addProductos:[],
        cant: null,
        valxCant: null,
        totalVenta: 0,
        totalIva: 0,
        valTotal: 0,
        status: false,
        client:[],
        consecutivo:0
    }

    componentWillMount(){
        this.getClientes();
        this.getProductos();
        this.consecutivo();
    }

    /* Función para consumir la API y traer los clientes */
    getClientes = () =>{
        axios.get("http://localhost:8080/api/clientes/")
        .then(res => {
            console.log(res.data);
            this.setState({
                listClientes: res.data
            })
        });
    }

    /* Función para consumir la API y traer los productos */
    getProductos = () =>{
        axios.get("http://localhost:8080/api/productos/")
        .then(res => {
            console.log(res.data);
            this.setState({
                listProductos: res.data
            })
        });
    }

    /* Adicionar un producto a la lista */
    getProducto = (id) =>{
        axios.get("http://localhost:8080/api/productos/prodcuto/"+id)
        .then(res => {
            if(res.data){
                console.log(res.data);
                this.setState({
                    listProductos:[...this.state.listProductos, res.data]
                })
            }else{
                console.log("No hay datos")
            }
        });
    }

    /* Función que me guarda el nombre del cliente obtenido desde el select */
    handleChangeCli = (c) =>{
        let cedula = Number(c.target.value)
        this.state.listClientes.filter(cl => cl.cedula === cedula ).map(filteredClient =>(
            this.setState({
                client: filteredClient
            })
        ));
    }

    /* Agrega un producto a la venta */
    addProducto = (e) =>{
        e.preventDefault();
        /* Calculo el IVA total de la venta */
        const IVA = this.state.valxCant * (this.state.prod.iva_compra/100);
        const total = this.state.valxCant + IVA;

        /* Obtengo los valores del producto seleccionado */
        if(this.state.prod.nombre_producto!=null && this.state.cant >0 && this.state.valxCant > 0){
            var productos ={
                id: this.state.prod._id,
                cantidad_producto: this.state.cant,
                codigo_producto: this.state.prod.codigo_producto,
                nombre_producto: this.state.prod.nombre_producto,
                valor_venta: this.state.valxCant,
                valoriva: IVA,
                valor_total: total
            }

            /* Agrego los valores de total venta y total IVA */
            this.setState({
                totalVenta: this.state.totalVenta + this.state.valxCant,
                totalIva: this.state.totalIva + IVA,
            });
            /* Calculo el valor total de la venta */
            const totalVenta = (this.state.totalVenta + this.state.valxCant) + (this.state.totalIva + IVA);

            /* Almaceno los datos */
            this.setState({
                valTotal: totalVenta,
                addProductos:[...this.state.addProductos, productos],
                status: true,
                cant: 0,
                valxCant: 0
            });
            /* Elimino el producto de la lista */
            const deleteP = this.state.listProductos.filter(producto => producto._id !== this.state.prod._id);
            this.setState({
                listProductos: deleteP,
                prod: []
            })

        }else{
            swal("Datos Erroneos", "Los campos no pueden estar vacios ó con valores en 0","error");
        }
    }

    /* Eliminar un producto de la venta */
    deleteProducto = (id,pos) =>{
        /* Obtengo el producto a eliminar con la posición */
        let product = this.state.addProductos[pos];
        /* Calcular el nuevo total, IVA y valorTotalconIVA*/
        let totalVenta = this.state.totalVenta - product.valxCant;
        let IVA = totalVenta * 0.19;
        let valTotal = totalVenta + IVA;
        /* Elimino el producto de la venta y almaceno los nuevos valores*/
        const deleteP = this.state.addProductos.filter(producto => producto.id !== id);
        this.setState({
            addProductos: deleteP,
            totalVenta: totalVenta,
            totalIva: IVA,
            valTotal: valTotal
        })

        /* Agrego el producto eliminado a la lista seleccionable*/
        this.getProducto(id);

        /* Condicón para cuando se elimina todos los productos no se muestren los totales */
        if(valTotal === 0){
            this.setState({
                status: false
            })
        }
    }

    /* Función que me guarda el nombre del producto obtenido desde el select */
    handleChangePro = (e) =>{
        let codigo = Number(e.target.value)
        this.state.listProductos.filter(p => p.codigo_producto === codigo ).map(filteredProduc =>(
            this.setState({
                prod: filteredProduc,
                cant: 0,
                valxCant: 0
            })
        ));
    }

    /* Función para calcular el valor total */
    calcularValor = (e) =>{
        let valor = this.state.prod.precio_compra * e.target.value;
        this.setState( {
            valxCant: valor,
            cant: e.target.value
        })
    }

    /* Envia la venta a la API para ser guardada */
    confirm =(e) =>{
        e.preventDefault();
        var venta = {
                cedula_cliente: this.state.client.cedula,
                codigo_venta: this.state.consecutivo,
                detalle_venta: this.state.addProductos,
                valor_venta: this.state.totalVenta,
                ivaventa: this.state.totalIva,
                total_venta: this.state.valTotal
        }
        console.log(venta)
        axios.post("http://localhost:8080/api/ventas/venta",venta)
        .then(res=>{
            if(res.data){
                this.setState({
                    ventas:res.data
                })
            }
        })
    }

    /* Obtiene todas las ventas registradas para generar el consecutivo */
    consecutivo = () =>{
        axios.get("http://localhost:8080/api/ventas/")
        .then(res => {
            this.setState({
                consecutivo: res.data.length + 1
            })
        });

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
                                    {this.state.listClientes.map(c=>(
                                        <option key={c.cedula} value={c.cedula}>{c.cedula}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label for="inputCliente">Cliente</label>
                            <input type="text" name="cliente" className="form-control" id="inputCliente" aria-label="cliente" aria-describedby="button-addon2" value={this.state.client.nombre} disabled required/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label for="inputConsec">Consecutivo</label>
                            <input type="text" className="form-control" id="inputConsec" name="consecutivo" aria-describedby="button-addon2" value={this.state.consecutivo} disabled/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div className="col-md-2 mb-2">
                            <label for="inputProduc">Cod. Producto</label>
                            <select name = "productos" className ="form-control" onChange = {this.handleChangePro}>
                                <option></option>
                                {this.state.listProductos.map(e=>(
                                    <option key={e.codigo_producto} value={e.id}>{e.codigo_producto}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label for="inputNomProduc">Nombre Producto</label>
                            <input type="text" className="form-control" id="inputNomProduc"  defaultValue={this.state.prod.nombre_producto} disabled/>
                        </div>
                        <div className="col-md-1 mb-1">
                            <label for="inputCant">Cant</label>
                            <input type="number" name="cant" className="form-control" id="inputCant" aria-label="cant" aria-describedby="button-addon2" value={this.state.cant} onChange = {this.calcularValor}/>
                        </div>
                        <div className="col-md-1 mb-1"></div>
                        <div className="col-md-3 mb-3">
                            <label for="inputCliente">Vlr. Total</label>
                            <input type="text" name="valor" className="form-control" id="inputCliente" aria-label="valor" aria-describedby="button-addon2" value={this.state.valxCant} disabled/>
                        </div>
                        <div className="col-sd-1 sd-1">
                            <button className="btn btn-sm btn-success" onClick = {this.addProducto}>+</button>
                        </div>
                    </div>
                    <hr></hr>
                    {this.state.status
                    ?<div>
                        <AddProductos id = {0} add={this.state.addProductos} deleteProducto={this.deleteProducto} />
                        <hr></hr>
                        <div style={{margin: "10px"}}>
                            <div className="form-row">
                                <div className="col-md-2 mb-2"></div>
                                <div className="col-md-4 mb-3"></div>
                                <div className="col-md-2 mb-2">
                                    <label for="inputCant">Total Venta</label>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <input type="text" name="totalVentas" className="form-control" id="inputtotalVentas" aria-label="totalVentas" aria-describedby="button-addon2" value={this.state.totalVenta} disabled/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-2 mb-2"></div>
                                <div className="col-md-4 mb-3"></div>
                                <div className="col-md-2 mb-2">
                                    <label for="inputCant">Total IVA</label>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <input type="text" name="totalIva" className="form-control" id="inputtotalIva" aria-label="totalIva" aria-describedby="button-addon2" value={this.state.totalIva} disabled/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-2 mb-2"></div>
                                <div className="col-md-4 mb-3"></div>
                                <div className="col-md-2 mb-2">
                                    <label for="inputCant">Total con IVA</label>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <input type="text" name="totalconIva" className="form-control" id="inputtotalconIva" aria-label="totalconIva" aria-describedby="button-addon2" value={this.state.valTotal} disabled/>
                                </div>
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-lg btn-primary" type="submit" onClick ={this.confirm} >Comfirmar</button>
                            </div>
                        </div>
                    </div>
                    : <></>
                    }
                </form>
            </div>
        )
    }
}
export default Ventas;