import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cNAme: 'nav-text'
    },
    {
        title: 'Productos',
        path: '/productos',
        icon: <FaIcons.FaCartPlus />,
        cNAme: 'nav-text'
    },
    {
        title: 'Clientes',
        path: '/clientes',
        icon: <IoIcons.IoMdPeople />,
        cNAme: 'nav-text'
    },
    {
        title: 'Ventas',
        path: '/ventas',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cNAme: 'nav-text'
    },
    {
        title: 'Reportes',
        path: '/reportes',
        icon: <IoIcons.IoIosPaper />,
        cNAme: 'nav-text'
    },
]
