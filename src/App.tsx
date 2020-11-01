import React from 'react';
import './App.css';
import FooterComponent from './components/layouts/FooterComponent/FooterComponent';
import TaskList from './components/layouts/TaskList/TaskList';

import NewTaskForm from './components/blocks/NewTaskForm/NewTaskForm';

function App() {
  return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm/>
        </header>
        <section className="main">
          <TaskList/>
          <FooterComponent/>
        </section>
      </section>
  );
}

export default App;
