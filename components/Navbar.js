import Link from "next/link";
import React, { useContext } from "react";
import { TableContext } from "../context/TableContext";


const Navbar = () => {
    const { setSelectedTable } = useContext(TableContext);

    const handleTableClick = (table) => {
      setSelectedTable(table);
    };

    return (
        <header className="flex justify-center p-3 bg-gray_minimalist ">
            <nav>
                <ul className="flex space-x-20">
                    <li>
                        <Link legacyBehavior href="/" className="text-white font-bold hover:text-white_minimalist ">
                            <a className="ext-white font-bold hover:text-white_minimalist" onClick={() => handleTableClick("clientes")}>Clientes</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/" className="text-white font-bold hover:text-white_minimalist">
                            <a className="ext-white font-bold hover:text-white_minimalist" onClick={() => handleTableClick("codigospostales")}>Codigos Postales</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/" className="text-white font-bold hover:text-white_minimalist">
                            <a className="ext-white font-bold hover:text-white_minimalist" onClick={() => handleTableClick("productos")}>Productos</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/" className="text-white font-bold hover:text-white_minimalist">
                            <a className="ext-white font-bold hover:text-white_minimalist" onClick={() => handleTableClick("proveedores")}>Proveedores</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/" className="text-white font-bold hover:text-white_minimalist">
                            <a className="ext-white font-bold hover:text-white_minimalist" onClick={() => handleTableClick("ventas")}>Ventas</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
