import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <header className="flex justify-center p-3 bg-gray_minimalist ">
            <nav >
                <ul className="flex space-x-20">
                    <li>
                        <Link href="/" className="text-white font-bold hover:text-white_minimalist ">Clientes</Link>
                    </li>
                    <li>
                        <Link href="/" className="text-white font-bold hover:text-white_minimalist">Codigos Postales</Link>
                    </li>
                    <li>
                        <Link href="/" className="text-white font-bold hover:text-white_minimalist">Productos</Link>
                    </li>
                    <li>
                        <Link href="/" className="text-white font-bold hover:text-white_minimalist">Proveedores</Link>
                    </li>
                    <li>
                        <Link href="/" className="text-white font-bold hover:text-white_minimalist">Ventas</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
