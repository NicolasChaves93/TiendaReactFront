import React, { Component } from 'react'

class AddProductos extends Component{
    state ={
        prod:[],
        cant: null,
        valTotal: null
    }

    /* Función que me guarda el nombre del producto obtenido desde el select */
    handleChangePro = (e) =>{
        let codigo = Number(e.target.value)
        this.props.productos.filter(p => p.codigo_producto === codigo ).map(filteredProduc =>(
            this.setState({
                prod: filteredProduc,
                cant: 0,
                valTotal: 0
                
            })
        ));
    }

    /* Función para calcular el valor total */
    calcularValor = (e) =>{
        let valor = this.state.prod.precio_compra * e.target.value;
        this.setState( {
            valTotal: valor,
            cant: e.target.value
        })
    }

    render(){
        return (
            <div class="form-row">
                        <div className="col-md-2 mb-2">
                            <label for="inputProduc">Cod. Producto</label>
                            <select name = "productos" className ="form-control" onChange = {this.handleChangePro} required>
                                <option></option>
                                {this.props.productos.map(e=>(
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
                            <input type="number" name="cant" className="form-control" id="inputCant" aria-label="cant" aria-describedby="button-addon2" value={this.state.cant} onChange = {this.calcularValor} required/>
                        </div>
                        <div className="col-md-1 mb-1"></div>
                        <div className="col-md-3 mb-3">
                            <label for="inputCliente">Vlr. Total</label>
                            <input type="text" name="valor" className="form-control" id="inputCliente" aria-label="valor" aria-describedby="button-addon2" value={this.state.valTotal} disabled/>
                        </div>
                        <div className="col-sd-1 sd-1">
                            <button className="btn btn-danger" onClick={this.props.deleteProducto.bind(this, this.props.id)} >-</button>
                        </div>
                    </div>
        )
    }
}
export default AddProductos;