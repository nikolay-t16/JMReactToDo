import React from 'react';
import TasksFilter from '../../blocks/TasksFilter/TasksFilter'

type FooterComponentProps = {
	tasksLeft: number,
	filterValue: number,
	onSetFilter: (value: number) => void,
	onRemoveCompleted: () => void,
}

function FooterComponent(props: FooterComponentProps) {
	return (
		<footer className="footer">
			<span className="todo-count">{props.tasksLeft} items left</span>
			<TasksFilter
				filterValue={props.filterValue}
				onSetFilter={props.onSetFilter}
			/>
			<button onClick={props.onRemoveCompleted} className="clear-completed">Clear completed</button>
		</footer>
	);
}

export default FooterComponent;
