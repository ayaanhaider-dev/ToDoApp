import React, { useEffect, useState } from "react";
import { useFirebase } from "../Contexts/Firebase";
import { AiFillDelete, AiOutlineLoading } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const { todos, createTodo, deleteTodo, updateTodo, user } = useFirebase();
  const [newTodoText, setNewTodoText] = useState("");
  const [editTodoText, setEditTodoText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTodoId, setEditTodoId] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handler for new todo input change
  const handleNewTodoChange = (event) => {
    setNewTodoText(event.target.value);
  };

  // Handler for creating a new todo
  const handleCreateTodo = () => {
    if (newTodoText) {
      setLoading(true);
      createTodo(newTodoText);
      setNewTodoText("");
      setLoading(false);
    }
  };

  // Handler for deleting a todo
  const handleDeleteTodo = (todoId) => {
    if (deleteConfirmationId === todoId) {
      setLoading(true);
      deleteTodo(todoId);
      setDeleteConfirmationId(null);
      setLoading(false);
    } else {
      setDeleteConfirmationId(todoId);
    }
  };

  // Handler for marking a todo as complete
  const handleCompleteTodo = (todoId) => {
    updateTodo(todoId, { completed: true });
  };

  // Handler for marking a todo as uncomplete
  const handleUncompleteTodo = (todoId) => {
    updateTodo(todoId, { completed: false });
  };

  // Handler for editing a todo
  const handleEditTodo = (todoId) => {
    const todo = todos.find((todo) => todo.id === todoId);
    setEditTodoText(todo.text);
    setEditTodoId(todoId);
  };

  // Handler for updating a todo
  const handleUpdateTodo = (todoId) => {
    setLoading(true);
    updateTodo(todoId, { text: editTodoText });
    setEditTodoId(null);
    setLoading(false);
  };

  // Handler for canceling edit mode
  const handleCancelEdit = () => {
    setEditTodoId(null);
  };

  // Filter the todos based on the selected filter option
  const filteredTodos = todos.filter((todo) => {
    if (filter === "complete") {
      return todo.completed;
    } else if (filter === "uncomplete") {
      return !todo.completed;
    } else {
      return true;
    }
  });

  // Check if a user is logged in, if not, navigate to the login page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="bg-gray-200 w-1/4 p-8">
        <h3 className="text-lg font-semibold mb-2">Filter Todos</h3>
        <ul className="mt-4">
          {/* Filter options */}
          <li
            className={`cursor-pointer mb-2 ${
              filter === "all" ? "font-bold" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </li>
          <li
            className={`cursor-pointer mb-2 ${
              filter === "complete" ? "font-bold" : ""
            }`}
            onClick={() => setFilter("complete")}
          >
            Completed
          </li>
          <li
            className={`cursor-pointer ${
              filter === "uncomplete" ? "font-bold" : ""
            }`}
            onClick={() => setFilter("uncomplete")}
          >
            Uncomplete
          </li>
        </ul>
        <div className="flex justify-center items-center">
          <button className="font-bold text-center text-teal-400 hover:text-blue-700 mt-16 bg-teal-400 rounded-lg hover:bg-blue-500">
            <Link
              to="https://icilyassertiveindoors.com/u1kfxwcti?key=5f6c43b068192a774117f5dbcba0b99e"
              className="block px-4 py-2"
            >
              <span className="text-black">Donate Us</span>
            </Link>
          </button>
        </div>
      </div>

      <div className="flex-grow bg-gray-100 p-8">
        <h3 className="text-lg font-semibold mb-2">Create Todo</h3>
        <div className="flex mb-4">
          {/* Input for creating a new todo */}
          <input
            type="text"
            className="border border-gray-300 rounded-md py-2 px-3 mr-2 flex-grow"
            value={newTodoText}
            placeholder="Add Your To Do here..."
            onChange={handleNewTodoChange}
          />
          <button
            className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            onClick={handleCreateTodo}
          >
            Add Todo
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">My Todos</h3>
          <div>
            {/* filtered todos */}
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white p-4 shadow-md rounded mb-4 ${
                  todo.completed ? "text" : ""
                }`}
              >
                {editTodoId === todo.id ? (
                  <div className="flex mb-2">
                    {/* Input for editing a todo */}
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md py-2 px-3 mr-2 flex-grow"
                      value={editTodoText}
                      onChange={(e) => setEditTodoText(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdateTodo(todo.id, todo.text)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    {/* Display todo text */}
                    <span className="mr-2">{todo.text}</span>
                    {/* Complete/uncomplete button */}
                    {!todo.completed ? (
                      <button
                        className="text-yellow-500 hover:text-yellow-700 mr-2"
                        onClick={() => handleCompleteTodo(todo.id)}
                      >
                        UnComplete
                      </button>
                    ) : (
                      <button
                        className="text-green-500 hover:text-green-700 mr-2"
                        onClick={() => handleUncompleteTodo(todo.id)}
                      >
                        Completed
                      </button>
                    )}
                    <div>
                      {/* Edit button */}
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleEditTodo(todo.id)}
                      >
                        Edit
                      </button>
                    </div>
                    {/* Delete button */}
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button className="font-bold text-center text-teal-400 hover:text-blue-700 mt-16 bg-teal-400 rounded-lg hover:bg-blue-500">
              <Link
                to="https://icilyassertiveindoors.com/u1kfxwcti?key=5f6c43b068192a774117f5dbcba0b99e"
                className="block px-4 py-2"
              >
                <span className="text-black">Donate Us</span>
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      {deleteConfirmationId && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this todo?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => handleDeleteTodo(deleteConfirmationId)}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setDeleteConfirmationId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-100 min-h-screen flex">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <AiOutlineLoading className="text-4xl text-white animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
