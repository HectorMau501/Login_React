//Son hooks de React que permiten gestionar efectos secundarios y estados en componentes funcionales
import React, { useEffect, useState } from "react"; //  funcionalidades esenciales para trabajar con componentes de React

//BrowserRouter: Es un componente de React que proporciona la funcionalidad de enrutamiento utilizando la API de historial del navegador
//Route: Es un componente que renderiza un componente o elemento UI específico cuando la ubicación actual coincide con la ruta proporcionada
//Routes: Se utiliza para definir las rutas de la aplicación y determinar qué componente se debe renderizar en función de la ubicación actual.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginSignup from "./LoginSignup";
import Home from "./Home";

function App() {
  const [data, setData] = useState([]);//  el hook useState
  const [error, setError] = useState(null);

  return (
    // React Router puedan acceder a la información de la ubicación actual.
    <Router> 
    {/* define las rutas de tu aplicación */}
      <Routes> 
      {/* es un componente que define una ruta específica en tu aplicacion. */}
        <Route
          path="/"
          element={<LoginSignup setData={setData} setError={setError} />}
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
