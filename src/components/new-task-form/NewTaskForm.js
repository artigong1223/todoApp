import React, { useState } from 'react';
import propTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm(props) {
  NewTaskForm.propTypes = {
    label: propTypes.string,
    sec: propTypes.number,
    min: propTypes.number,
  };
  const [label, setLabel] = useState('');
  const [sec, setSec] = useState('');
  const [min, setMin] = useState('');
  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };
  const onMinChange = (e) => {
    setMin(e.target.value);
  };
  const onSecChange = (e) => {
    setSec(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.addItem(label, min, sec);
    setSec('');
    setMin('');
    setLabel('');
  };
  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <label>
          <input
            minLength={1}
            maxLength={8}
            onChange={onLabelChange}
            className="new-todo"
            placeholder="Task"
            autoFocus
            value={label}
            required
          />
        </label>
        <input
          pattern="\d+"
          minLength={1}
          maxLength={2}
          onChange={onMinChange}
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={min}
          required
        ></input>
        <input
          pattern="\d+"
          minLength={1}
          maxLength={2}
          onChange={onSecChange}
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={sec}
          required
        ></input>
        <button type="submit"></button>
      </form>
    </header>
  );
}
export default NewTaskForm;
