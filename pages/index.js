import React from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table"
import { TableProvider } from "../context/TableContext";


const Home = () => {
  return (
    <div className="h-screen min-h-screen bg-gray-200 flex flex-col">
      <TableProvider>
        <Navbar />
        <Table />
      </TableProvider>
    </div>
  );
}

export default Home;