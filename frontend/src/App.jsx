import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  let [task, setTask] = useState("");
  let [priority, setPriority] = useState("high");
  let [info, setInfo] = useState({});
  let [data, setData] = useState([]);
  let [id, setId] = useState("");
  let [isUpdate, setIsUpdate] = useState(false);
  let [isImage, setisImage] = useState(null);

  // let handleClick = async () => {
  //   let data = await axios.post("http://localhost:5000/create/todo", formData);
  //   setInfo(data.data);
  //   let todosData = await axios.get("http://localhost:5000/allTodos");
  //   setData(todosData.data.data);
  // };
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
    setIsUpdate(false);
    setTask("");
    setPriority("high");
  };
  // ====================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    const task = formData.get("task");
    const priority = formData.get("priority");
    const image = formData.get("image");
    console.log(task, priority, image);

    let responseData = await axios.post(
      "http://localhost:5000/create/todo",
      formData,
    );
    console.log(responseData.data);
    let todosData = await axios.get("http://localhost:5000/allTodos");
    setData(todosData.data.data);
    setTask("");
    setPriority("");
    setisImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-lg mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-600">
          TODO
        </h1>

        {info.success ? (
          <p className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
            {info.message}
          </p>
        ) : (
          <p className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {info.message}
          </p>
        )}

        <div className="flex gap-2 mb-6">
          <input
            name="task"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleTaskChange}
            type="text"
            value={task}
          />
          <select
            name="priority"
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleSelectOption}
            value={priority}
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          <input name="image" type="file" />
          {isUpdate ? (
            <button
              className="px-4 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>

        <ul className="space-y-2">
          {data.map((item) => (
            <>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                {item.task}============={item.priority}==============
                {item.status}
                <span className="text-xs text-gray-400 ml-2">
                  📅 {new Date(item.createdAt).toLocaleString()}
                </span>
              </li>
              <img src={`http://localhost:5000/${item.path}`} alt="" />
              <button
                className="text-xs text-red-500 hover:text-red-700"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              <button
                className="text-xs text-blue-500 hover:text-blue-700 ml-2"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
            </>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default App;
