import React, { useState } from 'react';

const NewTodoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, description } = formData;

    if (name === '' || description === '') {
      return;
    }

    onSubmit({ name, description });

    setFormData({
      name: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        />
      </div>
      <div className="form-row">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={(event) => setFormData({ ...formData, description: event.target.value })}
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
};

export default NewTodoForm;