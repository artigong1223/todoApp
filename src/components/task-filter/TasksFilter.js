import React from 'react';
import propTypes from 'prop-types';

import './task-filter.css';

export default class Filters extends React.Component {
  static defaultProps = {
    onFilterChange: () => {},
  };
  static propTypes = {
    onFilterChange: propTypes.func,
    filter: propTypes.string.isRequired,
  };
  buttons = [
    { name: 'all', label: 'all' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' },
  ];
  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : '';
      return (
        <li key={name}>
          <button onClick={() => onFilterChange(name)} className={clazz}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}
