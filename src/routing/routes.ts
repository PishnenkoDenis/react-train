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
import { OtherSearch } from "../components/OtherSearch";
import { MySearch } from "../components/MySearch";
import { List } from "../components/List";
import { ConsoleChild } from "../components/ConsoleChildren";
import { NewSearch } from "../components/NewSearch";
import { NewTodo } from "../components/NewTodo";
import { PreviousVal } from "../components/PreviousVal";
import { InputRef } from "../components/InputRef";

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
        path: "newtodo",
        Component: NewTodo,
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
      {
        path: "othersearch",
        Component: OtherSearch,
      },
      {
        path: "mysearch",
        Component: MySearch,
      },
      {
        path: "newsearch",
        Component: NewSearch,
      },
      {
        path: "list",
        Component: List,
      },
      {
        path: "children",
        Component: ConsoleChild,
      },
      {
        path: "prev",
        Component: PreviousVal,
      },
      {
        path: "inputref",
        Component: InputRef,
      },
    ],
  },
]);
