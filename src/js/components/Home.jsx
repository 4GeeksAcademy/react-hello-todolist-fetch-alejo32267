import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

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
              if (e.key === "Enter") {
                setTodos(todos.concat([inputValue]));
                setInputValue("");
              }
            }}
            placeholder="What do you need to do?"
          />
        </li>

        {todos.map((item, index) => (
          <li key={index} className="tarea">
            {item}
            <FontAwesomeIcon
              icon={faTrash}
              className="trash-icon icono"
              onClick={() =>
                setTodos(todos.filter((_, currentIndex) => index !== currentIndex))
              }
            />
          </li>
        ))}
      </ul>
      <div>{todos.length} Tasks</div>
    </div>
  );
};

export default Home;
