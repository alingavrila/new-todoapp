import { Link, useHistory } from 'react-router-dom';


const Home = ({
    items,
    createTodoItem,
    newTodo,
    setNewTodo,
    signOut,
    copyLinkToClipboard,
    updateTodoItem,
    deleteTodoItem,
}) => {
    const history = useHistory();

    return (
        <div>
            <ul className='nav'>
                <li>
                    <Link to="/">HOME</Link>
                    <button className='btn btn-danger' onClick={signOut}>Sign out</button>
                </li>
            </ul>
            <p>Create your todo list:</p>
            <div className='form-row'>
                <input className='new-item-form'
                    type="text"
                    placeholder="Todo Name"
                    value={newTodo.name}
                    onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
                />
                <input className='new-item-form'
                    type="text"
                    placeholder="Todo Description"
                    value={newTodo.description}
                    onChange={(e) =>
                        setNewTodo({ ...newTodo, description: e.target.value })
                    }
                />
                <button className='btn' onClick={createTodoItem}>Add Todo</button>
            </div>

            {items.map((item) => (
                <div key={item.id} className='list'>
                    <li>
                        <div className='text-group'>
                            <p className='name'>{item.name}</p>
                            <p className='description'>{item.description}</p>
                        </div>
                        <div className='btn-group'>
                            <button className='btn btn-update'
                                onClick={() => history.push(`/update/${item.id}`)}
                            >
                                Update Todo
                            </button>
                            <button className='btn btn-danger' onClick={() => deleteTodoItem(item.id)}>Delete Todo</button>
                            <button className='btn'
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
