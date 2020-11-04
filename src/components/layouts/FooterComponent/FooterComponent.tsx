import React from 'react';
import TasksFilter from '../../blocks/TasksFilter/TasksFilter'

type FooterComponentProps = {
	tasksLeft: number,
	filterValue: number,
	onSetFilter: (value: number) => void,
	onRemoveCompleted: () => void,
}

function FooterComponent({tasksLeft, filterValue, onSetFilter, onRemoveCompleted}: FooterComponentProps) {
	return (
		<footer className="footer">
			<span className="todo-count">{tasksLeft} items left</span>
			<TasksFilter
				filterValue={filterValue}
				onSetFilter={onSetFilter}
			/>
			<button type="button" onClick={onRemoveCompleted} className="clear-completed">Clear completed</button>
		</footer>
	);
}

export default FooterComponent;
