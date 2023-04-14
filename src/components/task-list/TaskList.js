import React from 'react';
import propTypes from 'prop-types';

import './task-list.css';

import Task from '../task/task';

export default class TaskList extends React.Component {
  static defaultProps = {
    onToggle: () => {},
    onDeleted: () => {},
    onEditing: () => {},
    onStop: () => {},
    onPlay: () => {},
    onTick: () => {},
  };
  static propTypes = {
    onToggle: propTypes.func,
    onDeleted: propTypes.func,
    onEditing: propTypes.func,
    onStop: propTypes.func,
    onPlay: propTypes.func,
    onTick: propTypes.func,
    min: propTypes.number,
    sec: propTypes.number,
    todos: propTypes.arrayOf(propTypes.object).isRequired,
  };
  render() {
    const { todos, onDeleted, onToggle, onEditing, onStop, onPlay, onTick, min, sec } = this.props;
    const elements = todos.map((items) => {
      const { id, ...itemsProps } = items;
      return (
        <Task
          onPlay={() => onPlay(id)}
          onStop={() => onStop(id)}
          onTick={() => onTick(id)}
          onEditing={(label) => onEditing(label, id)}
          onToggle={() => onToggle(id)}
          onDeleted={() => onDeleted(id)}
          key={id}
          min={min}
          sec={sec}
          {...itemsProps}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
