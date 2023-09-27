import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from '../graphql/mutations'; // Import your GraphQL mutation
import { listTodos } from '../graphql/queries'; // Import your GraphQL query

const Home = ({ signOut }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '', completed: false });

  useEffect(() => {
    // Fetch todos when the component mounts
    fetchTodos();
  }, []); // Empty dependency array ensures it runs once on mount

  const fetchTodos = async () => {
    try {
      // Fetch the list of todos
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todoList = todoData.data.listTodos.items;
      // Update the state with the fetched todos
      setTodos(todoList);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    try {
      // Create a temporary variable to store the values
      const newNameValue = newTodo.name;
      const newDescriptionValue = newTodo.description;

      // Check if any of the required fields are empty
      if (!newNameValue || !newDescriptionValue) {
        console.error('Name and description are required.');
        return;
      }

      // Create the input object for the mutation
      const input = {
        name: newNameValue,
        description: newDescriptionValue,
        completed: newTodo.completed || false,
      };

      // Send a GraphQL mutation to create a new todo
      const response = await API.graphql(
        graphqlOperation(createTodo, { input })
      );

      // Extract the created todo from the response
      const createdTodo = response.data.createTodo;

      // Update the todos state with the new todo
      setTodos([...todos, createdTodo]);

      // Clear the input fields
      setNewTodo({ name: '', description: '', completed: false });

      // Log a success message
      console.log('Todo added successfully:', createdTodo);

      // Debug: Check if state is updated
      console.log('Updated todos state:', todos);
      console.log('Updated newTodo state:', newTodo);

      // Log a success message
      console.log('Todo added successfully:', createdTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };



  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button type="submit">Add Todo</button>
      </form>

      <h1 className="header">Todo List</h1>
      <ul>
        {/* Map through the todos and display name and description */}
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>

      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default Home;