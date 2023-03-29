import React from 'react';
import propTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  static propTypes = {
    label: propTypes.node,
  };
  state = {
    label: '',
  };
  onLabelChange = (e) => {
    if (e.target.value.length < 10) {
      this.setState({
        label: e.target.value,
      });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.length > 0 && !this.state.label[0].match(/\s/)) {
      this.props.onItemAdded(this.state.label);
    }
    this.setState({
      label: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} className="header">
        <h1>Todos</h1>
        <label>
          <input
            onChange={this.onLabelChange}
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.label}
          />
        </label>
      </form>
    );
  }
}
