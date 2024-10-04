import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Main = () => {
  return (
    <div style={{ width: "100%", margin: 0, padding: 0 }}>
      <Navigation />
      <Outlet />
    </div>
  );
};
