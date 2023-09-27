import React from 'react';

const TodoItem = ({ completed, id, name, description, toggleTodo, deleteTodo }) => {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleTodo(id, !completed)}
                />
                <div>
                    <p>{name}</p>
                    <p>{description}</p>
                </div>
            </label>
            <div className='task-buttons'>
                <button className="btn btn-update">
                    Update
                </button>
                <button className="btn btn-share">
                    Share
                </button>
                <button onClick={() => deleteTodo(id)} className="btn btn-danger">
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
