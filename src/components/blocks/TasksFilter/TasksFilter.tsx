import React from 'react';
import {FilterTypes} from '../../../App';

type TasksFilterProps = {
	filterValue: number,
	onSetFilter: (value: number) => void,
}

function TasksFilter(props: TasksFilterProps) {
	const buttonsData = [
		{label: 'All', value: FilterTypes.ALL},
		{label: 'Active', value: FilterTypes.UNCOMPLETED},
		{label: 'Completed', value: FilterTypes.COMPLETED},
	];
	const buttons = buttonsData.map((e,i) => <li key={i}>
		<button
			className={e.value === props.filterValue ? 'selected' : ''}
			onClick={()=>props.onSetFilter(e.value)}
		>
			{e.label}
		</button>
	</li>);
	return (
		<ul className="filters">
			{buttons}
		</ul>
	);
}

export default TasksFilter;
