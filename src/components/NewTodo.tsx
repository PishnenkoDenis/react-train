import React, { useState } from "react";

interface ITodo {
  name: string;
  id: string;
}

const createTodo = (todo: string, id?: string): ITodo => {
  return {
    name: todo,
    id: id ? id : new Date().toLocaleString(),
  };
};

export const NewTodo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(e.target.value);
  };

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && edit !== "") {
      setTodos((prev) =>
        [...prev].map((todo) => {
          if (todo.id === editId) {
            todo.name = edit;
          }
          return todo;
        })
      );
      setIsEdit(false);
      setEditId("");
    }
  };

  const addTodo = () => {
    const newTodo = createTodo(todo);
    setTodos((prev) => [...prev, newTodo]);
    setTodo("");
  };

  const editTodo = (id: string) => {
    setIsEdit(true);
    setEditId(id);
    const edited = todos.find((todo) => todo.id === id);
    edited && setEdit(edited.name);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => [...prev].filter((todo) => todo.id !== id));
  };

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
        margin: "auto",
      }}
    >
      <h3>Todo List</h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
          margin: "auto",
          gap: "20px",
        }}
      >
        <input value={todo} onChange={handleChangeTodo} />
        <button onClick={addTodo}>Add New Todo</button>
      </div>
      <ul style={{ width: "100%", padding: 0 }}>
        {todos.length
          ? todos.map(({ name, id }) => (
              <li
                key={id}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  border: "1px solid black",
                  textDecoration: "none",
                  marginTop: "5px",
                }}
              >
                {isEdit && editId === id ? (
                  <input
                    value={edit}
                    onChange={handleEditChange}
                    onKeyDown={handleEdit}
                  />
                ) : (
                  name
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button onClick={() => deleteTodo(id)}>Delete</button>
                  <button onClick={() => editTodo(id)}>Edit</button>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
