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
            <div className="text-lg text-left">
              {i + 1 + ".  "}
              {item.name}
            </div>
            <div className="text-sm mt-3 self-start text-left">{item.time}</div>
          </div>
          <button
            onClick={() => {
              let currentList = list;
              currentList = currentList.filter((item, index) => index !== i);
              db.collection("list")
                .doc(item.index.toString())
                .delete()
                .then((res) => console.log(res))
                .catch((res) => console.log(res));
              setList(currentList);
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
    currentList.push({
      name: input,
      time: new Date().toLocaleString("en-US"),
      index: currentList.length,
    });
    setList(currentList);
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
