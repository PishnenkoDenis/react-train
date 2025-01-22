import { FC } from "react";
import { Link } from "react-router-dom";

export const Navigation: FC = () => {
  return (
    <div
      style={{
        margin: "2rem",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Link to={"search"}>Search</Link>
      <Link to={"othersearch"}>OtherSearch</Link>
      <Link to={"mysearch"}>MySearch</Link>
      <Link to={"newsearch"}>NewSearch</Link>
      <Link to={"todo"}>Todo</Link>
      <Link to={"newtodo"}>NewTodo</Link>
      <Link to={"mousemove"}>Mouse</Link>
      <Link to={"visible"}>Visible</Link>
      <Link to={"counter"}>Counter</Link>
      <Link to={"date"}>Date</Link>
      <Link to={"reverse"}>ReverseCounts</Link>
      <Link to={"console"}>Console</Link>
      <Link to={"likes"}>Likes</Link>
      <Link to={"refs"}>Refs</Link>
      <Link to={"forward"}>Forward</Link>
      <Link to={"list"}>List</Link>
      <Link to={"children"}>ConsoleChildren</Link>
      <Link to={"prev"}>Previous</Link>
      <Link to={"inputref"}>InputRef</Link>
    </div>
  );
};
