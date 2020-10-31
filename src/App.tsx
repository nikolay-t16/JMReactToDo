import React from 'react';
import './App.css';
import FooterComponent from './components/blocks/FooterComponent/FooterComponent';

function App() {
  return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus/>
        </header>
        <section className="main">
          <ul className="todo-list">
            <li className="completed">
              <div className="view">
                <input className="toggle" type="checkbox"/>
                  <label>
                    <span className="description">Completed task</span>
                    <span className="created">created 17 seconds ago</span>
                  </label>
                  <button className="icon icon-edit"></button>
                  <button className="icon icon-destroy"></button>
              </div>
            </li>
            <li className="editing">
              <div className="view">
                <input className="toggle" type="checkbox"/>
                  <label>
                    <span className="description">Editing task</span>
                    <span className="created">created 5 minutes ago</span>
                  </label>
                  <button className="icon icon-edit"></button>
                  <button className="icon icon-destroy"></button>
              </div>
              <input type="text" className="edit" value="Editing task"/>
            </li>
            <li>
              <div className="view">
                <input className="toggle" type="checkbox"/>
                  <label>
                    <span className="description">Active task</span>
                    <span className="created">created 5 minutes ago</span>
                  </label>
                  <button className="icon icon-edit"></button>
                  <button className="icon icon-destroy"></button>
              </div>
            </li>
          </ul>
          <FooterComponent/>
        </section>
      </section>
  );
}

export default App;
