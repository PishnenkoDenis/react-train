import { FC } from "react";
import { Link } from "react-router-dom";

export const Navigation: FC = () => {
  return (
    <div
      style={{
        width: "40%",
        height: "40%",
        margin: "auto",
        marginTop: "2rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to={"search"}>Search</Link>
      <Link to={"todo"}>Todo</Link>
      <Link to={"mousemove"}>Mouse</Link>
      <Link to={"visible"}>Visible</Link>
      <Link to={"counter"}>Counter</Link>
      <Link to={"date"}>Date</Link>
      <Link to={"reverse"}>ReverseCounts</Link>
      <Link to={"console"}>Console</Link>
      <Link to={"likes"}>Likes</Link>
      <Link to={"refs"}>Refs</Link>
      <Link to={"forward"}>Forward</Link>
    </div>
  );
};
