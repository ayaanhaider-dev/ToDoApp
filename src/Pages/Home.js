import React, { useState } from 'react';
import { useFirebase } from '../Contexts/Firebase';
import { AiFillDelete } from 'react-icons/ai';

const Home = () => {
  const { todos, createTodo, deleteTodo, updateTodo, user } = useFirebase();
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTodoId, setEditTodoId] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  const handleNewTodoChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleCreateTodo = () => {
    if (newTodoText) {
      createTodo(newTodoText);
      setNewTodoText('');
    }
  };

  const handleDeleteTodo = (todoId) => {
    if (deleteConfirmationId === todoId) {
      deleteTodo(todoId);
      setDeleteConfirmationId(null);
    } else {
      setDeleteConfirmationId(todoId);
    }
  };

  const handleCompleteTodo = (todoId) => {
    updateTodo(todoId, { completed: true });
  };

  const handleUncompleteTodo = (todoId) => {
    updateTodo(todoId, { completed: false });
  };

  const handleEditTodo = (todoId) => {
    setEditTodoId(todoId);
  };

  const handleUpdateTodo = (todoId, updatedText) => {
    updateTodo(todoId, { text: updatedText });
    setEditTodoId(null);
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'complete') {
      return todo.completed;
    } else if (filter === 'uncomplete') {
      return !todo.completed;
    } else {
      return true;
    }
  });

  if (!user) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <h3 className="text-lg text-gray-500 font-semibold">
          Please log in to view your todos.
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="bg-gray-200 w-1/4 p-8">
        <h3 className="text-lg font-semibold mb-2">Filter Todos</h3>
        <ul className="mt-4">
          <li
            className={`cursor-pointer mb-2 ${filter === 'all' ? 'font-bold' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </li>
          <li
            className={`cursor-pointer mb-2 ${filter === 'complete' ? 'font-bold' : ''}`}
            onClick={() => setFilter('complete')}
          >
            Complete
          </li>
          <li
            className={`cursor-pointer ${filter === 'uncomplete' ? 'font-bold' : ''}`}
            onClick={() => setFilter('uncomplete')}
          >
            Uncomplete
          </li>
        </ul>
      </div>

      <div className="flex-grow bg-gray-100 p-8">
        <h3 className="text-lg font-semibold mb-2">Create Todo</h3>
        <div className="flex mb-4">
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

          {filteredTodos.map((todo) => (

            <div
              key={todo.id}
              className={`bg-white p-4 shadow-md rounded mb-4 ${
                todo.completed ? 'text' : ''
              }`}
            >
              {editTodoId === todo.id ? (
                <div className="flex mb-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 mr-2 flex-grow"
                    value={todo.text}
                    onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
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
                  <span className="mr-2">{todo.text}</span>
                  {!todo.completed ? (
                    <button
                    className="text-green-500 hover:text-green-700 mr-2"
                    onClick={() => handleCompleteTodo(todo.id)}
                    >
                      Complete
                    </button>
                  ) : (
                    <button
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                      onClick={() => handleUncompleteTodo(todo.id)}
                    >
                      Uncomplete
                    </button>
                  )}
                  <div>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditTodo(todo.id)}
                    >
                    Edit
                  </button>
                    </div>
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
      </div>
        </div>

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
    </div>
  );
};

export default Home;
