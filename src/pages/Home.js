import React, { Component } from 'react'

class Home extends Component{
    state = {
        isCiudad: false,
        ciudad: null
    }

    obtenerNom = (e) =>{
        const name = e.target.name;
        this.setState({
            isCiudad: true,
            ciudad: name
        })
        this.props.obtenerCiudad(name,true);
    }

    render(){
        return (
            <div className="text-center">
                <h1 className='title'>HOME</h1>
                {this.state.isCiudad ?
                <h2>Bienvenido a la sucursal de {this.state.ciudad}</h2>
                :<div>
                    <h3>Seleccione la ciudad</h3>
                    <button name="Bogota" className="btn btn-success justify-content-center" onClick={this.obtenerNom}>Bogota</button>
                    <span></span>
                    <button name="Cali" className="btn btn-success justify-content-center" onClick={this.obtenerNom}>Cali</button>
                    <span></span>
                    <button name="Medellin" className="btn btn-success justify-content-center" onClick={this.obtenerNom}>Medellin</button>
                </div>
                }
            </div>
        );
    }
}

export default Home;