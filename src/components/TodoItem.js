import React from 'react'

const TodoItem = ({ completed, id, title, toggleTodo, deleteTodo }) => {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title}
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
    )
}

export default TodoItem