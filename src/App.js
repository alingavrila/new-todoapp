import React, { useEffect, useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import UpdateTodo from './UpdateTodo';
import ViewTodo from './ViewTodo';

Amplify.configure(awsExports);

const App = ({ signOut }) => {
  const [items, setItems] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '' });

  useEffect(() => {
    listTodoItems();
  }, []);

  async function createTodoItem() {
    try {
      await API.graphql({
        query: createTodo,
        variables: { input: newTodo },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      console.log('New todo created');
      // This clears the input fields after creating the todo
      setNewTodo({ name: '', description: '' });
      // This then fetches the updated list of todos
      listTodoItems();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }

  async function listTodoItems() {
    try {
      const response = await API.graphql({
        query: listTodos,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const todos = response.data.listTodos.items;
      console.log('All todos:', todos);
      setItems(todos);
    } catch (error) {
      console.error('Error listing todos:', error);
    }
  }

  async function updateTodoItem(id, updatedData) {
    try {
      await API.graphql({
        query: updateTodo,
        variables: { input: { id, ...updatedData } },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      console.log('Todo updated');
      // This fetches the updated list of todos
      listTodoItems();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async function deleteTodoItem(id) {
    try {
      await API.graphql({
        query: deleteTodo,
        variables: { input: { id } },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      console.log('Todo deleted');
      // Fetch the updated list of todos
      listTodoItems();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  // Function to copy a link to the clipboard
  function copyLinkToClipboard(link) {
    navigator.clipboard.writeText(link).then(function () {
      console.log('Link copied to clipboard');
    });
  }

  return (
    <Router>
      <div>
        <h1>Hello</h1>
        <button onClick={signOut}>Sign out</button>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/update/:id" component={UpdateTodo} />
          <Route path="/view/:id" component={ViewTodo} />
        </Switch>

        <input
          type="text"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button onClick={createTodoItem}>Add Todo</button>

        {items.map((item) => (
          <div key={item.id}>
            <div>
              {item.name} - {item.description}
            </div>
            <button onClick={() => updateTodoItem(item.id)}>Update Todo</button>
            <button onClick={() => deleteTodoItem(item.id)}>Delete Todo</button>
            <button onClick={() => copyLinkToClipboard(`/view/${item.id}`)}>
              Copy Link
            </button>
            <Link to={`/view/${item.id}`}>
              <button>View Todo</button>
            </Link>
          </div>
        ))}
      </div>
    </Router>
  );
};

export default withAuthenticator(App);