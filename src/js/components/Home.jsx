import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  // Cargar tareas al iniciar
  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/alopez")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
      })
      .catch((error) => {
        console.error("Error al cargar tareas:", error.message);
      });
  }, []);

  // Agregar tarea
  const agregarTarea = async (nuevaTarea) => {
    try {
      await fetch("https://playground.4geeks.com/todo/todos/alopez", {
        method: "POST",
        body: JSON.stringify({ label: nuevaTarea, done: false }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Actualizar lista
      const res = await fetch("https://playground.4geeks.com/todo/users/alopez");
      const data = await res.json();
      setTodos(data.todos);
    } catch (error) {
      console.log("Error al agregar tarea:", error.message);
    }
  };

  // Eliminar tarea por id
  const eliminarTarea = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE"
      });

      // Traer lista actualizada
      const res = await fetch("https://playground.4geeks.com/todo/users/alopez");
      const data = await res.json();
      setTodos(data.todos);
    } catch (error) {
      console.log("Error al eliminar tarea:", error.message);
    }
  };

  // Borrar usuario completo
  const borrarTodas = async () => {
    try {
      await fetch("https://playground.4geeks.com/todo/users/alopez", {
        method: "DELETE"
      });
      setTodos([]);
    } catch (error) {
      console.log("Error al eliminar el usuario:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>My To Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim() !== "") {
                agregarTarea(inputValue.trim());
                setInputValue("");
              }
            }}
            placeholder="What do you need to do?"
          />
        </li>

        {todos.map((item) => (
          <li key={item.id} className="tarea">
            {item.label}
            <FontAwesomeIcon
              icon={faTrash}
              className="trash-icon icono"
              onClick={() => eliminarTarea(item.id)}
            />
          </li>
        ))}
      </ul>
      <div>{todos.length} Tasks</div>
      <button className="button" onClick={borrarTodas}>Delete User</button>
    </div>
  );
};

export default Home;
