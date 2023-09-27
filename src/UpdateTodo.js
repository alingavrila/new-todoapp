import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { updateTodo } from './graphql/mutations';
import { getTodo } from './graphql/queries';

const UpdateTodo = ({ match, history }) => {
    const todoId = match.params.id;

    const [todo, setTodo] = useState({ name: '', description: '' });

    useEffect(() => {
        // This function would fetch the existing todo data
        async function fetchTodo() {
            try {
                const response = await API.graphql({
                    query: getTodo,
                    variables: { id: todoId },
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                });
                const fetchedTodo = response.data.getTodo;
                setTodo(fetchedTodo);
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        }

        fetchTodo();
    }, [todoId]);

    async function handleUpdate() {
        try {
            await API.graphql({
                query: updateTodo,
                variables: { input: { id: todoId, ...todo } },
                authMode: 'AMAZON_COGNITO_USER_POOLS',
            });
            console.log('Todo updated');
            history.push('/'); // This redirects the user back to the homepage after updating
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    return (
        <div>
            <h2>Update Todo</h2>
            <div className='form-row'>
                <input className='new-item-form'
                    type="text"
                    placeholder="Todo Name"
                    value={todo.name}
                    onChange={(e) => setTodo({ ...todo, name: e.target.value })}
                />
                <input className='new-item-form'
                    type="text"
                    placeholder="Todo Description"
                    value={todo.description}
                    onChange={(e) =>
                        setTodo({ ...todo, description: e.target.value })
                    }
                />
                <button className='btn' onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
};

export default UpdateTodo;
