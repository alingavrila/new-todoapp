import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useUpdatedData } from './UpdatedDataContext';

const Home = ({
    items,
    createTodoItem,
    newTodo,
    setNewTodo,
    signOut,
    copyLinkToClipboard,
    deleteTodoItem,
}) => {
    // Initialize hooks and context
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { updatedData } = useUpdatedData();

    // Handle URL query parameter updates
    useEffect(() => {
        // Retrieve query parameters
        const updatedNameParam = searchParams.get('updatedName');
        const updatedDescriptionParam = searchParams.get('updatedDescription');

        // Update newTodo state if query parameters are present
        if (updatedNameParam || updatedDescriptionParam) {
            setNewTodo((prevTodo) => ({
                ...prevTodo,
                name: updatedNameParam || prevTodo.name,
                description: updatedDescriptionParam || prevTodo.description,
            }));
        }
    }, [searchParams, setNewTodo]);

    return (
        <div>
            <ul className='nav'>
                <li>
                    <Link to="/">HOME</Link>
                    <button className='btn btn-danger' onClick={signOut}>
                        Sign out
                    </button>
                </li>
            </ul>

            <p>Create your todo list:</p>
            <div className='form-row'>
                <input
                    className='new-item-form'
                    type="text"
                    placeholder="Todo Name"
                    value={newTodo.name}
                    onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
                />
                <input
                    className='new-item-form'
                    type="text"
                    placeholder="Todo Description"
                    value={newTodo.description}
                    onChange={(e) =>
                        setNewTodo({ ...newTodo, description: e.target.value })
                    }
                />
                <button className='btn' onClick={createTodoItem}>
                    Add Todo
                </button>
            </div>

            {items.map((item) => (
                <div key={item.id} className='list'>
                    <li>
                        <div className='text-group'>
                            <p className='name'>{item.name}</p>
                            <p className='description'>{item.description}</p>

                            {item.id === updatedData.id && (
                                <div>
                                    <p className='updated-name'>{updatedData.name}</p>
                                    <p className='updated-description'>
                                        {updatedData.description}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className='btn-group'>
                            {/* Update, delete, and copy buttons */}
                            <button
                                className='btn btn-update'
                                onClick={() => navigate(`/update/${item.id}`)}
                            >
                                Update Todo
                            </button>
                            <button
                                className='btn btn-danger'
                                onClick={() => deleteTodoItem(item.id)}
                            >
                                Delete Todo
                            </button>
                            <button
                                className='btn'
                                onClick={() => copyLinkToClipboard(`/view/${item.id}`)}
                            >
                                Copy Link
                            </button>
                            <Link to={`/view/${item.id}`}>
                                <button className='btn'>View Todo</button>
                            </Link>
                        </div>
                    </li>
                </div>
            ))}
        </div>
    );
};

export default Home;