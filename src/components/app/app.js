import React, { useState } from 'react';

import NewTaskForm from '../new-task-form/NewTaskForm';
import TaskList from '../task-list/TaskList';
import Footer from '../footer/footer';

import './app.css';

function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');
  const createTodoItem = (label, min, sec) => {
    return {
      label,
      min,
      sec,
      startTime: new Date().getTime(),
      done: false,
      id: new Date().getTime(),
      count: false,
    };
  };
  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };
  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    const newArr = [...todoData, newItem];
    setTodoData(newArr);
  };
  const onToggle = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };
  const onEditing = (label, id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, label };
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };
  const filters = (items, filter) => {
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
  };
  const onFilterChange = (filter) => {
    setFilter(filter);
  };
  const clearComplited = () => {
    setTodoData(todoData.filter((item) => !item.done));
  };
  const onTick = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    if (Number(oldItem.min) !== 0 && Number(oldItem.sec) === 0) {
      const newItem = { ...oldItem, min: Number(oldItem.min) - 1, sec: 59 };
      const newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      setTodoData(newTodoData);
    } else if (Number(oldItem.min) === 0 && Number(oldItem.sec) === 0) {
      const newItem = { ...oldItem, min: 0, sec: 0 };
      const newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      setTodoData(newTodoData);
    } else {
      const newItem = { ...oldItem, sec: Number(oldItem.sec) - 1 };
      const newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      setTodoData(newTodoData);
    }
  };
  const onPlay = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, count: true };
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };
  const onStop = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, count: false };
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };
  const visibleItems = filters(todoData, filter);
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;
  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        onPlay={onPlay}
        onStop={onStop}
        onEditing={onEditing}
        onDeleted={deleteItem}
        onToggle={onToggle}
        todos={visibleItems}
        onTick={onTick}
      />
      <Footer filter={filter} onFilterChange={onFilterChange} clearComplited={clearComplited} todo={todoCount} />
    </section>
  );
}

export default App;
