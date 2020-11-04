import React from 'react';
import './App.css';
import FooterComponent from './components/layouts/FooterComponent/FooterComponent';
import TaskList from './components/layouts/TaskList/TaskList';

import NewTaskForm from './components/blocks/NewTaskForm/NewTaskForm';

export type TaskData = {
  text: string;
  date: Date;
  isCompleted: boolean;
  isInEditMode: boolean;
};

export enum FilterTypes {
  ALL = 0,
  COMPLETED = 1,
  UNCOMPLETED = 2,
}

type AppState = {
  tasks: TaskData[];
  filterType: number;
};
type AppProps = {};

class App extends React.Component<AppProps, AppState> {
  public state: AppState;

  constructor(props: AppProps = {}) {
    super(props);
    this.state = {
      tasks: [
        {
          text: 'Completed task',
          date: new Date(Date.now() - 17 * 1000),
          isCompleted: true,
          isInEditMode: false,
        },
        {
          text: 'Editing task',
          date: new Date(Date.now() - 5 * 60 * 1000),
          isCompleted: false,
          isInEditMode: true,
        },
        {
          text: 'Active task',
          date: new Date(Date.now() - 5 * 60 * 1000),
          isCompleted: false,
          isInEditMode: false,
        },
      ],
      filterType: FilterTypes.ALL,
    };
  }

  public onSetFilter(value: number) {
    this.setState({ filterType: value });
  }

  public onRemoveCompleted() {
    this.setState(({ tasks }) => ({ tasks: tasks.filter((task) => !task.isCompleted) }));
  }

  public onAdd(taskText: string) {
    this.setState((state) => {
      const newTasks = [
        ...state.tasks,
        {
          text: taskText,
          date: new Date(),
          isCompleted: false,
          isInEditMode: false,
        },
      ];
      return { tasks: newTasks };
    });
  }

  public onRemove(i: number) {
    const { tasks } = this.state;
    if (i > tasks.length || i < 0) {
      return;
    }
    this.setState((state) => {
      const newTasks = [...state.tasks];
      newTasks.splice(i, 1);
      return { tasks: newTasks };
    });
  }

  public onStartEditing(i: number) {
    this.setState((state) => {
      const tasks = [...state.tasks];
      tasks[i].isInEditMode = true;
      return { tasks };
    });
  }

  public onEdit(i: number, newText: string) {
    this.setState(({ tasks: oldTasks }) => {
      const tasks = [...oldTasks];
      tasks[i].isInEditMode = false;
      tasks[i].text = newText;
      return { tasks };
    });
  }

  public onSetComplete(i: number, isCompleted: boolean) {
    this.setState(({ tasks: oldTasks }) => {
      const tasks = [...oldTasks];
      tasks[i].isCompleted = isCompleted;
      return { tasks };
    });
  }

  public get tasksLeft() {
    const { tasks } = this.state;
    return tasks.reduce((res, task) => (task.isCompleted ? res : res + 1), 0);
  }

  public get filteredTasks() {
    const { filterType, tasks } = this.state;
    if (filterType === FilterTypes.ALL) {
      return tasks;
    }
    return tasks.filter((task) => task.isCompleted === (filterType === FilterTypes.COMPLETED));
  }

  render() {
    const { filterType } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={(taskText) => this.onAdd(taskText)} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.filteredTasks}
            onRemove={(i) => this.onRemove(i)}
            onStartEditing={(i) => this.onStartEditing(i)}
            onEdit={(i, newText) => this.onEdit(i, newText)}
            onSetComplete={(i, isCompleted) => this.onSetComplete(i, isCompleted)}
          />
          <FooterComponent
            tasksLeft={this.tasksLeft}
            filterValue={filterType}
            onSetFilter={(value) => this.onSetFilter(value)}
            onRemoveCompleted={() => this.onRemoveCompleted()}
          />
        </section>
      </section>
    );
  }
}

export default App;
