import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Reportes from './pages/Reportes'
import Productos from './pages/Productos'
import Clientes from "./pages/Clientes";
import React from "react";
import AgregarProducto from './components/AgregarProducto'
import EditarProducto from "./components/EditarProducto";
import { useAuth0 } from "@auth0/auth0-react";

import {LoginButton} from "./components/Login";
import {LogoutButton} from "./components/Logout"
import { Profile } from "./components/Profile";


function App() {
  const {isAuthenticated} = useAuth0();
  return (
    <React.Fragment>
      <div>
        {isAuthenticated ? (
          <>
          <Profile />
          <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )
      }
        

      </div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/clientes' element={<Clientes/>}/>
          <Route exact path='/reportes' element={<Reportes/>}/>
          <Route exact path='/productos' element={<Productos/>}/>
          <Route exact path='/agregarProducto' element={<AgregarProducto/>}/>
          <Route exact path='/editarProducto/:id' element={<EditarProducto/>}/>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
