import { useState } from "react";

type DTO = { id: number; name: string };
export const ReverseCounts = () => {
  const [list, setList] = useState<DTO[]>([
    { id: 1, name: "first" },
    { id: 2, name: "second" },
  ]);

  const handleReverse = () => {
    setList((prev) => [...prev].reverse()); //reverse мутирующий метод, поэтому мутирует старую ссылку prev.reverse(),
    //необходимо возвращать новый массив [...prev]
  };

  return (
    <div
      style={{
        display: "flex",
        width: "150px",
        flexDirection: "column",
        gap: "20px",
        margin: "auto",
      }}
    >
      <ul style={{ width: "100%" }}>
        {list.map((item) => (
          <li
            key={item.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>{item.name}</p>
            <p>{item.id}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleReverse}>Reverse</button>
    </div>
  );
};
