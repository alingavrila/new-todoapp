import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { useParams, Link } from 'react-router-dom';
import { useUpdatedData } from './UpdatedDataContext';
import { updateTodo } from './graphql/mutations';
import { getTodo } from './graphql/queries';

const UpdateTodo = ({ signOut }) => {
    const { id } = useParams();
    const { setUpdatedData } = useUpdatedData();

    const [todo, setTodo] = useState({ name: '', description: '' });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
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

    async function handleUpdate() {
        try {
            await API.graphql({
                query: updateTodo,
                variables: {
                    input: {
                        id,
                        name: todo.name,
                        description: todo.description,
                    },
                },
                authMode: 'AMAZON_COGNITO_USER_POOLS',
            });

            setUpdatedData({
                name: todo.name,
                description: todo.description,
            });

            setSuccessMessage('Todo updated successfully. Go back to the Home page and reload to view updates!');

        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    return (
        <div>
            <ul className='nav'>
                <li>
                    <Link to="/">HOME</Link>
                    <button className='btn btn-danger' onClick={signOut}>Sign out</button>
                </li>
            </ul>
            <h2>Update Todo</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className='form-row'>
                <input
                    className='new-item-form'
                    type='text'
                    placeholder='Todo Name'
                    value={todo.name}
                    onChange={(e) => setTodo({ ...todo, name: e.target.value })}
                />
                <input
                    className='new-item-form'
                    type='text'
                    placeholder='Todo Description'
                    value={todo.description}
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                />
                <button className='btn' onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default UpdateTodo;