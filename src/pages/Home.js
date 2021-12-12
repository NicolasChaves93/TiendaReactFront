import React from 'react'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div><h1 className='title'>HOME</h1>
            <h1 align="center">Seleccione la ciudad</h1>
            <table align="center">
                <tr>
                    <td>
                        <Link className="btn btn-success justify-content-center" to = "/consolidadoBogota">Bogota</Link>
                    </td>
                    <td>
                        <Link className="btn btn-success justify-content-center" to = "/consolidadoMedellin">Medellin</Link>
                    </td>
                    <td>
                        <Link className="btn btn-success justify-content-center" to = "/consolidadoCali">Cali</Link>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default Home;