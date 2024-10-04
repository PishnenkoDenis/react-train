import { useState } from "react";

export const MouseMove = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  return (
    <div style={{ height: "100vh" }} onMouseMove={handleMouseMove}>
      <h3>Mouse Moving</h3>
      <p>
        Mouse position: {mouse.x}, {mouse.y}
      </p>
    </div>
  );
};
