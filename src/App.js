import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";

import Home from './pages/Home'

import Productos from './pages/Productos'
import AgregarProducto from './components/AgregarProducto'
import EditarProducto from "./components/EditarProducto";

import Clientes from "./pages/Clientes";
import AgregarCliente from "./components/AgregarCliente";
import EditarCliente from "./components/EditarCliente";

import Proveedores from "./pages/Proveedores"
import AgregarProveedor from "./components/AgregarProveedor"
import EditarProveedor from "./components/EditarProveedor"
import Ventas from "./pages/Ventas";
import Reportes from "./pages/Reportes";
import Consolidado from "./pages/Consolidado";


function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          {/* Enlaces Clientes */}
          <Route exact path='/clientes' element={<Clientes/>}/>
          <Route exact path='/agregarCliente' element={<AgregarCliente/>}/>
          <Route exact path='/editarCliente/:id' element={<EditarCliente/>}/>
          {/* Enlaces Productos */}
          <Route exact path='/productos' element={<Productos/>}/>
          <Route exact path='/agregarProducto' element={<AgregarProducto/>}/>
          <Route exact path='/editarProducto/:id' element={<EditarProducto/>}/>
          {/* Enlaces Proveedores */}
          <Route exact path='/proveedores' element={<Proveedores/>}/>
          <Route exact path='/agregarProveedor' element={<AgregarProveedor/>}/>
          <Route exact path='/editarProveedor/:id' element={<EditarProveedor/>}/>
          {/* Enlace Ventas */}
          <Route exact path='/ventas' element={<Ventas/>}/>
          {/* Enlace Reporte */}
          <Route exact path='/reportes' element={<Reportes/>}/>
          {/* Enlace Consolidado */}
          <Route exact path='/consolidado' element={<Consolidado/>}/>

        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
