import React, {
  FC,
  PropsWithChildren,
  memo,
  useCallback,
  useState,
} from "react";

interface IButtonProps {
  onClick: () => void;
}

interface IInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
}

interface ITodo {
  todo: string;
  id: string;
}

const Button: FC<PropsWithChildren<IButtonProps>> = memo(
  ({ onClick, children }) => {
    console.log("btn");
    return <button onClick={onClick}>{children}</button>;
  }
);

const Input: FC<PropsWithChildren<IInputProps>> = memo(
  ({ onChange, value, onKeyPress }) => {
    console.log("inp");
    return (
      <input
        value={value}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyPress}
      />
    );
  }
);

const createTodo = (todo: string, Id?: string) => {
  return {
    todo,
    id: Id ? Id : new Date().toLocaleString(),
  };
};

export const Todo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string>("");

  const handleChangeTodo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodo(e.target.value);
    },
    [setTodo]
  );

  const handleEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEdit(e.target.value);
    },
    []
  );

  const addTodo = useCallback(() => {
    const newItem = createTodo(todo);
    setTodos((prev) => [...prev, newItem]);
    setTodo("");
  }, [todo]);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const editTodo = useCallback(
    (id: string) => {
      setIsEdit(true);
      setEditId(id);
      const edited = todos.find((todo) => todo.id === id);
      if (edited) setEdit(edited?.todo);
    },
    [todos]
  );

  const handleEdit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && edit !== "") {
        // const edited = todos.map((todo) => {
        //   if (todo.id === editId) {
        //     todo.todo = edit;
        //   }
        //   return todo;
        // });
        setTodos((prev) =>
          [...prev].map((todo) => {
            if (todo.id === editId) {
              todo.todo = edit;
            }
            return todo;
          })
        );
        setIsEdit(false);
        setEdit("");
      }
    },
    [edit, editId]
  );

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
        <Input value={todo} onChange={handleChangeTodo} />
        <Button onClick={addTodo}>Add New Todo</Button>
      </div>
      <ul style={{ width: "100%", padding: 0 }}>
        {todos.length
          ? todos.map(({ todo, id }) => (
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
                  <Input
                    value={edit}
                    onChange={handleEditChange}
                    onKeyPress={handleEdit}
                  />
                ) : (
                  todo
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button onClick={() => deleteTodo(id)}>Delete</Button>
                  <Button onClick={() => editTodo(id)}>Edit</Button>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
