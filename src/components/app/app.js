import React from 'react';

import NewTaskForm from '../new-task-form/NewTaskForm';
import TaskList from '../task-list/TaskList';
import Footer from '../footer/footer';

import './app.css';

export default class App extends React.Component {
  maxId = 0;
  interval;
  state = {
    todoData: [],
    filter: 'all',
  };
  createTodoItem(label, min, sec) {
    return {
      label,
      min,
      sec,
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
  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return { todoData: newArr };
    });
  };
  onToggle = (id) => {
    clearInterval(this.interval);
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
  onPlay = (id) => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.onTick(id);
    }, 1000);
  };
  onStop = () => {
    clearInterval(this.interval);
  };
  onTick = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      if (Number(oldItem.min) !== 0 && Number(oldItem.sec) === 0) {
        const newItem = { ...oldItem, min: Number(oldItem.min) - 1, sec: 59 };
        const newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        return {
          todoData: newTodoData,
        };
      } else if (Number(oldItem.min) === 0 && Number(oldItem.sec) === 0) {
        const newItem = { ...oldItem, min: 0, sec: 0 };
        const newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        clearInterval(this.interval);
        return {
          todoData: newTodoData,
        };
      } else {
        const newItem = { ...oldItem, sec: Number(oldItem.sec) - 1 };
        const newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        return {
          todoData: newTodoData,
        };
      }
    });
  };
  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          itemsActive={this.itemsActive}
          onEditing={this.onEditing}
          onDeleted={this.deleteItem}
          onToggle={this.onToggle}
          todos={visibleItems}
          onPlay={this.onPlay}
          onStop={this.onStop}
          onTick={this.onTick}
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
