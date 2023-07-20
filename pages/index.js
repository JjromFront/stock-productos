import React from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table"

const Home = () => {
  return (
    <div className="h-screen min-h-screen bg-gray-200 flex flex-col">
      <Navbar />
      <Table />
    </div>
  );
}

export default Home;