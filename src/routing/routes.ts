import { createBrowserRouter } from "react-router-dom";
import { Main } from "../components/Main";
import { Search } from "../components/Search";
import { Todo } from "../components/Todo";
import { MouseMove } from "../components/MouseMove";
import { Visible } from "../components/Visible";
import { Counter } from "../components/Counter";
import { DateSet } from "../components/Date";
import { ReverseCounts } from "../components/ReverseCounts";
import { Console } from "../components/Console";
import { Likes } from "../components/Likes";
import { Refs } from "../components/Refs";
import { Forward } from "../components/ForwardRef";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "search",
        Component: Search,
      },
      {
        path: "todo",
        Component: Todo,
      },
      {
        path: "mousemove",
        Component: MouseMove,
      },
      {
        path: "visible",
        Component: Visible,
      },
      {
        path: "counter",
        Component: Counter,
      },
      {
        path: "date",
        Component: DateSet,
      },
      {
        path: "reverse",
        Component: ReverseCounts,
      },

      {
        path: "console",
        Component: Console,
      },
      {
        path: "likes",
        Component: Likes,
      },
      {
        path: "refs",
        Component: Refs,
      },
      {
        path: "forward",
        Component: Forward,
      },
    ],
  },
]);
