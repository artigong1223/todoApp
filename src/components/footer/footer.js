import React from 'react';
import propTypes from 'prop-types';

import Filters from '../task-filter/TasksFilter';

import './footer.css';

class Footer extends React.Component {
  static defaultProps = {
    clearComplited: () => {},
    onFilterChange: () => {},
  };
  static propTypes = {
    clearComplited: propTypes.func,
    onFilterChange: propTypes.func,
    todo: propTypes.number.isRequired,
    filter: propTypes.string.isRequired,
  };
  render() {
    const { todo, filter, onFilterChange, clearComplited } = this.props;
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
}
export default Footer;
