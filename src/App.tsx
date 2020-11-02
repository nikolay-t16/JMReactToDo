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

export class FilterTypes {
	public static readonly ALL = 0;
	public static readonly COMPLETED = 1;
	public static readonly UNCOMPLETED = -1;

}

type AppState = {
    tasks: TaskData[];
    filterType: number;
};
type AppProps = {};

class App extends React.Component<AppProps, AppState> {
    public state: AppState;

	public get tasksLeft() {
		return this.state.tasks.reduce((res, e) => e.isCompleted ? res : res + 1, 0);
	}

	public get filteredTasks() {
		if(this.state.filterType === FilterTypes.ALL){
			return this.state.tasks;
		}
		return this.state.tasks.filter(_ => _.isCompleted === (this.state.filterType === FilterTypes.COMPLETED));
	}

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

	render() {
		return (
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<NewTaskForm onAdd={this.onAdd.bind(this)}/>
				</header>
				<section className="main">
					<TaskList
						tasks={this.filteredTasks}
						onRemove={this.onRemove.bind(this)}
						onStartEditing={this.onStartEditing.bind(this)}
						onEdit={this.onEdit.bind(this)}
						onSetComplete={this.onSetComplete.bind(this)}
					/>
					<FooterComponent
						tasksLeft={this.tasksLeft}
						filterValue={this.state.filterType}
						onSetFilter={this.onSetFilter.bind(this)}
						onRemoveCompleted={this.onRemoveCompleted.bind(this)}
					/>
				</section>
			</section>
		);
	}

	public onSetFilter(value: number) {
		this.setState({filterType: value});
	}

	public onRemoveCompleted() {
		this.setState(state => ({tasks: state.tasks.filter(_ => !_.isCompleted)}));
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
				}
			];
			return {tasks: newTasks};
		});
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
