import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const url = 'http://localhost:3333/usuarios';
  const [Get, setGet] = useState(null);
  useEffect(() => {
    axios.get(`${url}/1`).then((response) => {
      setGet(response.data);
    });
  
  }, []);

  const [count] = useState(0);

  return (
    <>
      <h1>Formulario</h1>
      <br/>
      <input type="text" placeholder='Ingrese el nombre'/>
      <br/>
      <input type="email" placeholder='Ingrese email'/>
      <br/>
      <input type="text" placeholder="Ingrese la clave" />
      <br />
      <button>Listo</button>
    </>
  );
}
export default App; 
