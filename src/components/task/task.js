import React, { useState } from 'react';
import propTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import TaskTogglTime from '../task-toggl-time/taskTogglTime';

import './task.css';

const classNames = require('classnames');

function Task(props) {
  Task.defaultProps = {
    onToggle: () => {},
    onDeleted: () => {},
    onEditing: () => {},
    onStop: () => {},
    onPlay: () => {},
    onTick: () => {},
  };
  Task.propTypes = {
    onToggle: propTypes.func,
    onDeleted: propTypes.func,
    onEditing: propTypes.func,
    done: propTypes.bool.isRequired,
    label: propTypes.node.isRequired,
    editing: propTypes.node,
    onStop: propTypes.func,
    onPlay: propTypes.func,
    onTick: propTypes.func,
    min: propTypes.node.isRequired,
    sec: propTypes.node.isRequired,
    startTime: propTypes.node.isRequired,
    count: propTypes.bool,
  };
  const [edit, setEdit] = useState(false);
  const [editing, setEditing] = useState(props.label);
  const onEdit = () => {
    setEdit(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.onEditing(editing);
    setEdit(false);
  };
  const onLabelChange = (e) => {
    setEditing(e.target.value);
  };
  const { onDeleted, onToggle, done, startTime, onPlay, onStop, onTick, min, sec, count } = props;
  const time = formatDistanceToNow(startTime, {
    includeSeconds: true,
  });
  const clazz = classNames({ completed: done }, { editing: edit });
  return (
    <li className={clazz}>
      <div className="view">
        <input className="toggle" type={'checkbox'} onClick={onToggle} checked={done} readOnly />
        <label onClick={onToggle}>
          <span className="title">{editing}</span>
          <TaskTogglTime
            min={min}
            sec={sec}
            count={count}
            done={done}
            onPlay={() => onPlay()}
            onStop={() => onStop()}
            onTick={() => onTick()}
          />
          <span className="description">created {time} ago</span>
        </label>
        <button onClick={onEdit} className="icon icon-edit"></button>
        <button onClick={onDeleted} className="icon icon-destroy"></button>
      </div>
      <form onSubmit={onSubmit}>
        <input maxLength={8} type={'text'} className="edit" onChange={onLabelChange} value={editing} />
      </form>
    </li>
  );
}
export default Task;
