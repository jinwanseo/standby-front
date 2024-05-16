import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={"flex flex-col gap-2 h-screen w-screen bg-slate-200"}>
      <header></header>
      <main className={"h-full w-full"}>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
