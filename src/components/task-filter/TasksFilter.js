import React from 'react';
import propTypes from 'prop-types';

import './task-filter.css';

function Filters(props) {
  Filters.defaultProps = {
    onFilterChange: () => {},
  };
  Filters.propTypes = {
    onFilterChange: propTypes.func,
    filter: propTypes.string.isRequired,
  };
  const buttons = [
    { name: 'all', label: 'all' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' },
  ];
  const { filter, onFilterChange } = props;
  const btn = buttons.map(({ name, label }) => {
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
  return <ul className="filters">{btn}</ul>;
}
export default Filters;
