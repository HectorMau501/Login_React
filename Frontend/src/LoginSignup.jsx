import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";


import user from "../src/assets/Icons/person.png";
import email from "../src/assets/Icons/email.png";
import password from "../src/assets/Icons/password.png";

const LoginSignup = () => {

  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [correo, setCorreo] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = () => { 
    fetch("http://localhost:8081/register", { //es una función de JavaScript para realizar solicitudes HTTP
      method: "POST", //Enviar datos al servidor
      headers: { //  indicar que el contenido del cuerpo de la solicitud está en formato JSON.
        "Content-Type": "application/json",
      },
      //El cuerpo de la solicitud contiene los datos del usuario que se están registrando
      body: JSON.stringify({
        nombre: username,
        correo,
        password: passwordInput,
      }),
    })
    //En este caso, se asume que el servidor responde con datos en formato JSON
      .then((res) => res.json())
      .then((data) => {
        // Maneja la respuesta del servidor
        alert(data.message);
        console.log(data);

        setCorreo("")
        setUsername("")
        setPasswordInput("")
      })
      .catch((err) => {
        console.error("Error al registrar usuario:", err);
      });
  };

  const handleLogin = () => {
    console.log("Correo:", correo);
    console.log("Contraseña:", passwordInput);

    fetch("http://localhost:8081/login", {     // Realiza la solicitud al servidor para registrar al usuario
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: correo,
        password: passwordInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/home"); //Redidecciona al componente home
        } else {
          setError(data.error || "Error al iniciar sesión");
        }
      })
      .catch((err) => {
        console.error("Error al loguear usuario:", err);
      });
  };

  return (
    <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={user} alt="" />
              <input
                type="text"
                placeholder="Nombre de Usuario"
                value={username} //Defenir la variable que va a guardar
                onChange={(e) => setUsername(e.target.value)} //Para el hacer el cambio en el input
              />
            </div>
          )}
          <div className="input">
            <img src={email} alt="" />
            <input
              type="email"
              placeholder="Correo Electronico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password} alt="" />
            <input
              type="password"
              placeholder="Contraseña"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
        </div>
        {action === "Sing Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            ¿Olvidaste tu Contraseña? <span>Click Aquí</span>
          </div>
        )}
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign Up");
              handleRegister(); //Realiza ese metodo
            }}
          >
            Registrarte
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Login");
              handleLogin();
            }}
          >
            Login
          </div>
        </div>
    </div>
  );
};

export default LoginSignup;
