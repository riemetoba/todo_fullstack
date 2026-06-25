import { useState } from "react";
import axios from "axios";

function App() {
  let [task, setTask] = useState("");
  let [priority, setPriority] = useState("");
  let [info, setInfo] = useState({});

  let handleClick = async () => {
    let data = await axios.post("http://localhost:5000/create/todo", {
      task: task,
      priority: priority,
    });
    setInfo(data.data);
  };
  let handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  let handleSelectOption = (e) => {
    setPriority(e.target.value);
  };
  return (
    <>
      <h1>Todo</h1>
      {info.success ? (
        <p>{info.message}</p>
      ) : (
        <p style={{ background: "red" }}>{info.message}</p>
      )}
      <input onChange={handleTaskChange} type="text" />
      <select onChange={handleSelectOption}>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
      <button onClick={handleClick}>Submit</button>
    </>
  );
}

export default App;
