/* eslint-disable no-mixed-operators */
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
    return <button onClick={onClick}>{children}</button>;
  }
);

const useIsMounted = () => {
  const mountRef = useRef(false);
  mountRef.current = true;

  useEffect(() => {
    return () => {
      mountRef.current = false;
    };
  }, []);

  return mountRef.current;
};

export const Visible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const isFirstRender = useIsMounted();

  useEffect(() => {
    if (isFirstRender) {
      setIsVisible(true);
    }
  }, [isFirstRender]);

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        margin: "auto",
        gap: "20px",
      }}
    >
      <Button onClick={handleClick}>{!isVisible ? "Show" : "Hide"}</Button>
      {isVisible && <h3>Watch Me</h3>}
    </div>
  );
};
