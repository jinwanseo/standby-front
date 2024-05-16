import React from "react";
import SSEConnect from "common/sse/SSEConnect";

interface ICustomer {
  id: number;
  createdAt: number;
}

function App() {
  const handlers = {
    onConnect: () => {
      const sseConnect = SSEConnect.getInstance();
      if (sseConnect.eventSource != null) {
        sseConnect.close();
      }

      const customerIdElement: HTMLElement | null =
        document.getElementById("customerId");
      if (customerIdElement === null) return;
      const val = (customerIdElement as HTMLInputElement).value;
      sseConnect.connect(val);
      sseConnect.addEventListener("customer", (event) => {
        if ("data" in event && event.data !== null) {
          const container = document.getElementById("container");
          container!.innerHTML += `<div>${event.data}</div>`;
        }
      });

      sseConnect.addEventListener("market", (event) => {
        if (
          "data" in event &&
          event.data !== null &&
          typeof event.data == "string"
        ) {
          const result: ICustomer[] = JSON.parse(event.data);
          const customers = result.sort((a, b) => a.createdAt - b.createdAt);
          const index = customers.findIndex(
            (customer) => customer.id === Number(val),
          );
          console.log(`내 순서는 ${index}번째 입니다`);
        }
      });
    },
  };

  return (
    <div className="App">
      <div className={"text-sky-800 font-bold"}>Hello world!</div>
      <div className={"flex flex-col gap-2"}>
        <input id={"customerId"} className={"border border-1 border-sky-800"} />
        <button
          onClick={handlers.onConnect}
          className={"px-10 py-2 bg-sky-900 text-sky-50"}
        >
          접속
        </button>
      </div>

      <div
        id={"container"}
        className={"flex flex-col gap-2 justify-center items-center"}
      ></div>
    </div>
  );
}

export default App;
