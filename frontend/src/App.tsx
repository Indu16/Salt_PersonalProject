import React, {useEffect, useState} from 'react';
import './CSS Styling/App.css';
import Dashboard from './Components/Dashboard';
import { Link, Route, Routes } from "react-router-dom";
import Form from './Components/Form';
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Inventory App</h1>
        <div className="topnav">
          <a className="active">Home</a>
            <a>Stock Managemnt</a>
          <a href="#productmanagement">Product Management</a>
          <a href="#about">About</a>
        </div>
        <body className="appBody">
        <div className="Dashboard"><Dashboard/></div>
        <div className="formSection"><Form/></div>

        </body>
      </header>
    </div>
  );
}

export default App;
