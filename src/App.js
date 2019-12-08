import React from "react";
import { toast } from "react-toastify";
import logo from "./logo.png";
import PokeList from "./pokemon/PokeList";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

toast.configure();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
      <PokeList />
    </div>
  );
}

export default App;
