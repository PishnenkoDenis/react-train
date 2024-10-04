import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface IForwardRef {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

type TForwardProps = {};

const ForwardRef = forwardRef<IForwardRef, TForwardProps>((props, ref) => {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };

  useImperativeHandle(ref, () => ({
    count,
    setCount,
  }));

  return (
    <div
      {...props}
      style={{
        width: "100%",
        display: "flex",
        gap: "50px",
        marginTop: "20px",
        margin: "auto",
      }}
    >
      <span>Count: {count}</span>
      <button onClick={handleCount}>Increment</button>
    </div>
  );
});

export const Forward = () => {
  const countRef: React.LegacyRef<IForwardRef> | undefined =
    useRef<IForwardRef>(null);

  useEffect(() => {
    console.log(countRef.current);
  }, []);

  const increment = () => countRef.current?.setCount((prev) => prev + 1);
  const decrement = () => countRef.current?.setCount((prev) => prev - 1);

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "20px",
        margin: "auto",
      }}
    >
      <ForwardRef ref={countRef} />
      <button onClick={increment}>Increment Ref</button>
      <button onClick={decrement}>Decrement Ref</button>
    </div>
  );
};
