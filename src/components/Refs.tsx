import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const Refs = () => {
  const wrapRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState(wrapRef.current?.clientWidth);
  const [leftSize, setLeftSize] = useState<number | null>(null);
  const [rightSize, setRightSize] = useState<number | null>(null);
  const [wrapHeight, setWrapHeight] = useState<number | null>(null);

  const callbackRef = useCallback((node: Element) => {
    if (node !== null) {
      setWrapHeight(node.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    setSize(wrapRef.current?.clientWidth);
    const handleResize = () => setSize(wrapRef.current?.clientWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const left = wrapRef.current?.querySelector(".left");
    const right = wrapRef.current?.querySelector(".right");

    const leftWidth = left?.getBoundingClientRect().width;
    const rightWidth = right?.getBoundingClientRect().width;

    console.log("Effect", leftWidth, rightWidth);

    if (size && leftWidth && rightWidth) {
      setLeftSize(Math.floor(leftWidth));
      setRightSize(Math.floor(rightWidth));
    }
  }, [size]);

  useLayoutEffect(() => {
    const left = wrapRef.current?.querySelector(".left");
    const right = wrapRef.current?.querySelector(".right");

    const leftWidth = left?.getBoundingClientRect().width;
    const rightWidth = right?.getBoundingClientRect().width;

    console.log("LayoutEffect", left, right);

    if (size && leftWidth && rightWidth) {
      setLeftSize(Math.floor(leftWidth));
      setRightSize(Math.floor(rightWidth));
    }
  }, [size]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          height: "200px",
          maxWidth: "100%",
          display: "flex",
          alignItems: "center",
          background: "lightgray",
          margin: "auto",
        }}
        ref={wrapRef}
        className="wrapper"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            border: "1px solid black",
            background: "teal",
            minWidth: "60%",
          }}
          className="left"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
          reprehenderit corporis explicabo aliquam tempore quos ipsam
          consectetur!
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            border: "1px solid black",
            background: "lightgreen",
            minWidth: "30%",
          }}
          className="right"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
          possimus ut fugiat tempora laudantium recusandae commodi atque
          voluptatum.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          margin: "auto",
          height: "100px",
          width: "20%",
          border: "1px solid black",
          padding: "0.5rem",
        }}
        ref={callbackRef as React.LegacyRef<HTMLDivElement> | undefined}
      >
        <span>Size is {size}px</span>
        <span>
          Left: {leftSize}px; Right: {rightSize}px
        </span>
        <span>WrapHeight: {wrapHeight && Math.round(wrapHeight)}px;</span>
      </div>
    </div>
  );
};
