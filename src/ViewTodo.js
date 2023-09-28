import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API } from 'aws-amplify';
import { getTodo } from './graphql/queries';

const ViewTodo = () => {
  const { id } = useParams();

  const [todo, setTodo] = useState(null);

  useEffect(() => {
    // This fetches and displays the specific todo to any authenticated user the link has been shared with
    async function fetchTodo() {
      try {
        const response = await API.graphql({
          query: getTodo,
          variables: { id },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        const fetchedTodo = response.data.getTodo;
        setTodo(fetchedTodo);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    }

    fetchTodo();
  }, [id]);

  return (
    <div>
      <h2>View Todo</h2>
      {todo ? (
        <div>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewTodo;