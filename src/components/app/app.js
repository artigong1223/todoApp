import React from 'react';

import NewTaskForm from '../new-task-form/NewTaskForm';
import TaskList from '../task-list/TaskList';
import Footer from '../footer/footer';

import './app.css';

export default class App extends React.Component {
  maxId = 0;
  state = {
    todoData: [],
    filter: 'all',
  };
  creatTodoitem(label) {
    return {
      label,
      startTime: new Date().getTime(),
      done: false,
      id: this.maxId++,
    };
  }
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };
  addItem = (text) => {
    const newItem = this.creatTodoitem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return { todoData: newArr };
    });
  };
  onToggle = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };
  onEditing = (label, id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'Active':
        return items.filter((item) => !item.done);
      case 'Completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  clearComplited = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((item) => !item.done),
      };
    });
  };
  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          itemsActive={this.itemsActive}
          onEditing={this.onEditing}
          onDeleted={this.deleteItem}
          onToggle={this.onToggle}
          todos={visibleItems}
        />
        <Footer
          filter={filter}
          onFilterChange={this.onFilterChange}
          clearComplited={this.clearComplited}
          todo={todoCount}
        />
      </section>
    );
  }
}
