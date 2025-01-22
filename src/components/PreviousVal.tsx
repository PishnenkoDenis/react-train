import { useEffect, useRef, useState } from "react";

const usePrevious = (val: any) => {
  const prevRef = useRef(val);

  useEffect(() => {
    prevRef.current = val;
  }, [val]);

  return prevRef.current;
};

export const PreviousVal = () => {
  const [count, setCount] = useState(0);
  const prevValue = usePrevious(count);

  const handleCount = () => setCount((prev) => prev + 1);

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
      {count}
      {prevValue}
      <button onClick={handleCount}>Increment</button>
    </div>
  );
};
