import React from "react";
import "./App.css";
import { db } from "./index.js";

function App() {
  const [list, setList] = React.useState([]);

  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    db.collection("list").onSnapshot((res) => {
      let dbList = [];
      res.forEach((r) => {
        console.log(r.data());
        dbList.push(r.data());
      });
      console.log(dbList);
      setList(dbList);
    });
  }, []);
  const showList = (list) => {
    if (!list.length) return <></>;
    return list.map((item, i) => {
      return (
        <div
          key={item.index}
          className="w-96 h-24 border-2 border-white rounded-md flex items-center justify-between px-4 mb-4"
        >
          <div>
            <p
              className="text-lg text-left"
              style={
                item.done
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
            >
              {i + 1 + ".  "}
              {item.name}
            </p>
            <div className="text-sm mt-3 self-start text-left">{item.time}</div>
          </div>
          <button
            className="mr-4"
            onClick={() => {
              let currentList = list;
              db.collection("list").doc(item.index.toString()).update({
                done: !item.done,
              });
            }}
          >
            Done
          </button>
          <button
            onClick={() => {
              db.collection("list")
                .doc(item.index.toString())
                .delete()
                .then((res) => console.log(res))
                .catch((res) => console.log(res));
            }}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  const AddListItem = (input) => {
    let currentList = list;
    if (!input) return null;
    db.collection("list")
      .doc(currentList.length.toString())
      .set({
        name: input,
        time: new Date().toLocaleString("en-US"),
        index: currentList.length,
      })
      .then((res) => console.log("added successfully"))
      .catch((err) => console.log(err));
    setInput("");
  };
  return (
    <div className="App h-screen flex items-center flex-col justify-center bg-blue-500 text-white">
      <h1 className="font-bold text-xl mb-6">To Do App</h1>
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          className="border-2 h-8 rounded-md mr-6 px-4 outline-none text-gray-500"
          value={input}
        />
        <button
          className="w-20 h-8 border-2 rounded-md"
          onClick={() => AddListItem(input)}
        >
          Add
        </button>
      </div>
      <div className="h-3/4 w-auto mt-8  px-8 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded">
        {showList(list)}
      </div>
    </div>
  );
}

export default App;
