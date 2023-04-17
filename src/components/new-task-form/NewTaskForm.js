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
    if (e.target.value.length < 10) {
      this.setState({
        label: e.target.value,
      });
    }
  };
  onMinChange = (e) => {
    if (e.target.value.match(/^\d+$/) && e.target.value.length < 3) {
      this.setState({
        min: e.target.value,
      });
    }
  };
  onSecChange = (e) => {
    if (e.target.value.match(/^\d+$/) && e.target.value.length < 3) {
      this.setState({
        sec: e.target.value,
      });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.length && !this.state.label[0].match(/\s/) && this.state.min.length && this.state.sec.length) {
      this.props.addItem(this.state.label, this.state.min, this.state.sec);
    }
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
              onChange={this.onLabelChange}
              className="new-todo"
              placeholder="Task"
              autoFocus
              value={this.state.label}
              required
            />
          </label>
          <input
            onChange={this.onMinChange}
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            value={this.state.min}
            required
          ></input>
          <input
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
