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
					<TaskList tasks={this.state.tasks}/>
					<FooterComponent/>
				</section>
			</section>
		);
	}
}

export default App;
