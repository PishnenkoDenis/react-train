import React, { FC, useEffect } from "react";

const Parent: FC<{ children: React.JSX.Element }> = ({ children }) => {
  console.log(1);
  useEffect(() => console.log(2), []);

  return <div>{children}</div>;
};

const Child = () => {
  console.log(3);
  useEffect(() => console.log(4), []);

  return <div />;
};

export const ConsoleChild = () => {
  return (
    <Parent>
      <Child />
    </Parent>
  );
};

//1 3 4 2
