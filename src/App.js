import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Reportes from './pages/Reportes'
import Productos from './pages/Productos'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/reportes' element={<Reportes/>}/>
          <Route exact path='/productos' element={<Productos/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
