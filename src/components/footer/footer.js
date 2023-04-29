import React from 'react';
import propTypes from 'prop-types';

import Filters from '../task-filter/TasksFilter';

import './footer.css';

function Footer(props) {
  Footer.defaultProps = {
    clearComplited: () => {},
    onFilterChange: () => {},
  };
  Footer.propTypes = {
    clearComplited: propTypes.func,
    onFilterChange: propTypes.func,
    todo: propTypes.number.isRequired,
    filter: propTypes.string.isRequired,
  };
  const { todo, filter, onFilterChange, clearComplited } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{todo} items left</span>
      <Filters filter={filter} onFilterChange={onFilterChange} />
      <button onClick={clearComplited} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
export default Footer;
