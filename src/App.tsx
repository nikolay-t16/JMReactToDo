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
}

type AppState = {
    tasks: TaskData[];
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
                    date: new Date(),
                    isCompleted: true,
                    isInEditMode: false,
                },
                {
                    text: 'Editing task',
                    date: new Date(),
                    isCompleted: false,
                    isInEditMode: true,
                },
                {
                    text: 'Active task',
                    date: new Date(),
                    isCompleted: false,
                    isInEditMode: false,
                },
            ]
        };
	}

	render() {
		return (
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<NewTaskForm/>
				</header>
				<section className="main">
					<TaskList
						tasks={this.state.tasks}
						onRemove={this.onRemove.bind(this)}
						onStartEditing={this.onStartEditing.bind(this)}
						onEdit={this.onEdit.bind(this)}
						onSetComplete={this.onSetComplete.bind(this)}
					/>
					<FooterComponent/>
				</section>
			</section>
		);
	}

	public onRemove(i: number) {
		if (i > this.state.tasks.length || i < 0) {
			return;
		}
		this.setState((state) => {
			const newTasks = [...state.tasks];
			newTasks.splice(i, 1);
			return {tasks: newTasks};
		});
	}

	public onStartEditing(i: number) {
		this.setState((state) => {
			state.tasks[i].isInEditMode = true;
			return {tasks: state.tasks};
		});
	}

	public onEdit(i: number, newText: string) {
		this.setState((state) => {
			state.tasks[i].isInEditMode = false;
			state.tasks[i].text = newText;
			return {tasks: state.tasks};
		});
	}

	public onSetComplete(i: number, isCompleted: boolean) {
		this.setState((state) => {
			state.tasks[i].isCompleted = isCompleted;
			return {tasks: state.tasks};
		});
	}
}

export default App;
