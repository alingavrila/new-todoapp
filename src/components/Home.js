import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';
import "../styles.css";
import { listTodos } from '../graphql/queries';
import { createTodo } from '../graphql/mutations';

const Home = ({ signOut }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '', completed: false });

  const addTodo = async () => {
    const { name, description } = newTodo;

    if (!name || !description) {
      console.error('Name and description are required.');
      return;
    }

    const input = {
      name,
      description,
      completed: newTodo.completed || false,
    };

    try {
      const response = await API.graphql(graphqlOperation(createTodo, { input }));
      const createdTodo = response.data.createTodo;
      setTodos([...todos, createdTodo]);
      console.log('Todo added successfully:', createdTodo);
      setNewTodo({ name: '', description: '', completed: false });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todoList = todoData.data.listTodos.items;
      setTodos(todoList);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  const toggleTodo = async (id, completed) => {

  };

  const deleteTodo = async (id) => {

  };

  return (
    <div>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default Home;
