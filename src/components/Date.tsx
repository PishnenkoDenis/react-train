import {
  FC,
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface IButtonProps {
  onClick: () => void;
}

const Button: FC<PropsWithChildren<IButtonProps>> = memo(
  ({ onClick, children }) => {
    console.log("render");
    return <button onClick={onClick}>{children}</button>;
  }
);

const showDate = (date: Date) => console.log(date);

export const DateSet = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isStarted, setIsStarted] = useState(false);
  const dateRef = useRef(date);

  const handleDate = useCallback(() => {
    setIsStarted((prev) => !prev);
  }, []);

  useEffect(() => {
    const increment = () => {
      setDate(new Date());
      dateRef.current = new Date();
    };
    let interval: NodeJS.Timeout | null = null;
    if (isStarted) {
      interval = setInterval(increment, 1000);
    }

    return () => {
      interval && clearInterval(interval);
      showDate(dateRef.current);
    };
  }, [isStarted]);

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
      <p>{date.toLocaleString()}</p>
      <Button key={"1"} onClick={handleDate}>
        {isStarted ? "Stop" : "Start"}
      </Button>
    </div>
  );
};
