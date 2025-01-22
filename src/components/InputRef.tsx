import { FC, LegacyRef, memo, useCallback, useRef, useState } from "react";

interface INameProps {
  name: string;
  isDisabled: boolean;
  onClick: (val: string) => void;
}

interface InputRefState {
  name: string;
  id: number;
}

const names: InputRefState[] = [
  { name: "1", id: 1 },
  { name: "2", id: 2 },
  { name: "3", id: 3 },
];

const Name: FC<INameProps> = memo(({ name, isDisabled, onClick }) => {
  return (
    <button disabled={isDisabled} onClick={() => onClick(name)}>
      {name} <span>x</span>
    </button>
  );
});

export const InputRef = () => {
  const [elems, setElems] = useState<InputRefState[]>(names);
  const nameRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);

  const deleteElem = useCallback((val: string) => {
    setElems((prev) => prev.filter(({ name }) => name !== val));
  }, []);

  const addElem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newElem: InputRefState = {
      name: nameRef.current?.value
        ? (nameRef.current?.value as string)
        : "no input",
      id: Date.now(),
    };
    newElem && setElems((prev) => [...prev, newElem]);

    if (nameRef.current) nameRef.current.value = "";
  };

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        marginTop: "4rem",
        margin: "auto",
      }}
    >
      {elems.map(({ name, id }, index) => (
        <Name
          onClick={deleteElem}
          isDisabled={index === 0}
          name={name}
          key={id}
        />
      ))}
      <form onSubmit={(e) => addElem(e)}>
        <input type="text" ref={nameRef} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
