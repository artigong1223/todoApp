import React from 'react';
import propTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  static propTypes = {
    label: propTypes.string,
    sec: propTypes.number,
    min: propTypes.number,
  };
  state = {
    label: '',
    sec: '',
    min: '',
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label, this.state.min, this.state.sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };
  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <label>
            <input
              minLength={1}
              maxLength={10}
              onChange={this.onLabelChange}
              className="new-todo"
              placeholder="Task"
              autoFocus
              value={this.state.label}
              required
            />
          </label>
          <input
            pattern="\d+"
            minLength={1}
            maxLength={2}
            onChange={this.onMinChange}
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            value={this.state.min}
            required
          ></input>
          <input
            pattern="\d+"
            minLength={1}
            maxLength={2}
            onChange={this.onSecChange}
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            value={this.state.sec}
            required
          ></input>
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}
