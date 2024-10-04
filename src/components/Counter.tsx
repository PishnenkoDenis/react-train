import {
  FC,
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IButtonProps {
  onClick: () => void;
}
const Button: FC<PropsWithChildren<IButtonProps>> = memo(
  ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
  }
);

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [isStoped, setIsStoped] = useState(true);

  const handleClick = useCallback(() => {
    setIsStoped((prev) => !prev);
  }, []);

  const handleCancel = useCallback(() => {
    setCount(0);
    setIsStoped(true);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const increment = () => setCount((prev) => (prev += 1));
    if (!isStoped) {
      intervalId = setInterval(increment, 200);
    }

    return () => {
      clearInterval(intervalId as NodeJS.Timeout);
    };
  }, [isStoped]);

  return (
    <div
      style={{
        width: "150px",
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
        margin: "auto",
      }}
    >
      <p style={{ textAlign: "center" }}>{count}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
          margin: "auto",
          gap: "0.5rem",
        }}
      >
        <Button onClick={handleClick}>{isStoped ? "Start" : "Stop"}</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};
