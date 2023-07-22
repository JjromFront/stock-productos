import React, { createContext, useState } from "react";

const TableContext = createContext();

const TableProvider = ({ children }) => {
    const [selectedTable, setSelectedTable] = useState("clientes");

    return (
        <TableContext.Provider value={{ selectedTable, setSelectedTable }}>
            {children}
        </TableContext.Provider>
    );
};

export { TableContext, TableProvider };