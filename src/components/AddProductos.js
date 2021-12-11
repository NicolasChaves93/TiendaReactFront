import React, { Component } from 'react'

class AddProductos extends Component{

    render(){
        return (
            <div>
                {this.props.add.map((a,index)=>(
                    <div className="form-row">
                        <div className="col-md-1 mb-1"></div>
                        <div className="col-md-2 mb-2">
                            <label for="Produc">{a.codigo_producto}</label>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label for="NomProduc">{a.nombre_producto}</label>
                        </div>
                        <div className="col-md-1 mb-1">
                            <label for="Cant">{a.cantidad_producto}</label>
                        </div>
                        <div className="col-md-1 mb-1"></div>
                        <div className="col-md-3 mb-3">
                            <label for="Cliente">{a.valor_venta}</label>
                        </div>
                        <div className="col-sd-1 sd-1">
                        <button className="btn btn-danger" onClick={this.props.deleteProducto.bind(this, a.id,index)} >-</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default AddProductos;