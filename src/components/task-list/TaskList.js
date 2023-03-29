import React from 'react';
import propTypes from 'prop-types';

import './task-list.css';

import Task from '../task/task';

export default class TaskList extends React.Component {
  static defaultProps = {
    onToggle: () => {},
    onDeleted: () => {},
    onEditing: () => {},
  };
  static propTypes = {
    onToggle: propTypes.func,
    onDeleted: propTypes.func,
    onEditing: propTypes.func,
    todos: propTypes.arrayOf(propTypes.object).isRequired,
  };
  render() {
    const { todos, onDeleted, onToggle, onEditing } = this.props;
    const elements = todos.map((items) => {
      const { id, ...itemsProps } = items;
      return (
        <Task
          onEditing={(label) => onEditing(label, id)}
          onToggle={() => onToggle(id)}
          onDeleted={() => onDeleted(id)}
          key={id}
          {...itemsProps}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
