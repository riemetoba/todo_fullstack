import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  let [task, setTask] = useState("");
  let [priority, setPriority] = useState("");
  let [info, setInfo] = useState({});
  let [data, setData] = useState([]);
  let [id, setId] = useState("");
  let [isUpdate, setIsUpdate] = useState(false);

  let handleClick = async () => {
    let data = await axios.post("http://localhost:5000/create/todo", {
      task: task,
      priority: priority,
    });
    setInfo(data.data);
    let todosData = await axios.get("http://localhost:5000/allTodos");
    setData(todosData.data.data);
  };
  let handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  let handleSelectOption = (e) => {
    setPriority(e.target.value);
  };

  useEffect(() => {
    async function todos() {
      let todosData = await axios.get("http://localhost:5000/allTodos");
      setData(todosData.data.data);
    }
    todos();
  }, []);
  let handleDelete = async (id) => {
    let deleteTask = await axios.delete(`http://localhost:5000/delete/${id}`, {
      task: task,
      priority: priority,
    });
    console.log(deleteTask);
    let todosData = await axios.get("http://localhost:5000/allTodos");
    setData(todosData.data.data);
  };

  const handleEdit = async (item) => {
    setTask(item.task);
    setPriority(item.priority);
    setId(item._id);
    setIsUpdate(true);
  };

  const handleUpdate = async () => {
    let data = await axios.post(`http://localhost:5000/update/${id}`, {
      task: task,
      priority: priority,
    });
    console.log(data);
    let todosData = await axios.get("http://localhost:5000/allTodos");
    setData(todosData.data.data);
    setIsUpdate(false)
    setTask("")
    setPriority("")
  };
  return (
    <>
      <h1>Todo</h1>
      {info.success ? (
        <p>{info.message}</p>
      ) : (
        <p style={{ background: "red" }}>{info.message}</p>
      )}
      <input onChange={handleTaskChange} type="text" value={task} />
      <select onChange={handleSelectOption} value={priority}>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
      {isUpdate ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleClick}>Submit</button>
      )}
      <ul>
        {data.map((item) => (
          <>
            <li>
              {item.task}============={item.priority}=============={item.status}
            </li>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
          </>
        ))}
      </ul>
    </>
  );
}

export default App;
