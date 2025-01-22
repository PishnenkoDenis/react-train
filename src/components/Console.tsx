import { FC, useEffect, useState } from "react";

type ChildProps = { count: number };

const Child: FC<ChildProps> = ({ count }) => {
  useEffect(() => {
    console.log(5);

    return () => {
      console.log(6);
    };
  }, [count]);

  return null;
};

export const Console = () => {
  const [count, setCount] = useState(1);

  console.log(1);

  useEffect(() => {
    console.log(2);

    return () => {
      console.log(3);
    };
  }, [count]);

  useEffect(() => {
    console.log(4);

    setCount((count) => count + 1);
  }, []);

  return <Child count={count} />;
};

//1 5 2 4 6 3   1 5 2 4 1  1 6 3 5 2
