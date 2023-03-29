import React from 'react';
import propTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

const classNames = require('classnames');

export default class Task extends React.Component {
  static defaultProps = {
    onToggle: () => {},
    onDeleted: () => {},
    onEditing: () => {},
  };
  static propTypes = {
    onToggle: propTypes.func,
    onDeleted: propTypes.func,
    onEditing: propTypes.func,
    done: propTypes.bool.isRequired,
    label: propTypes.node.isRequired,
    editing: propTypes.node,
    startTime: propTypes.node.isRequired,
  };
  state = {
    edit: false,
    editing: this.props.label,
  };
  onEdit = () => {
    this.setState({
      edit: true,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEditing(this.state.editing);
    this.setState({
      edit: false,
    });
  };
  onLabelChange = (e) => {
    this.setState({
      editing: e.target.value,
    });
  };
  render() {
    const { editing, edit } = this.state;
    const { onDeleted, onToggle, done, startTime } = this.props;
    const time = formatDistanceToNow(startTime, {
      includeSeconds: true,
    });
    const clazz = classNames({ completed: done }, { editing: edit });
    return (
      <li className={clazz}>
        <div className="view">
          <input className="toggle" type={'checkbox'} onClick={onToggle} checked={done} readOnly />
          <label onClick={onToggle}>
            <span className="description">{editing}</span>
            <span className="created">created {time} ago</span>
          </label>
          <button onClick={this.onEdit} className="icon icon-edit"></button>
          <button onClick={onDeleted} className="icon icon-destroy"></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type={'text'} className="edit" onChange={this.onLabelChange} value={editing} />
        </form>
      </li>
    );
  }
}
