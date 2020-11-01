import React from 'react';
import {TaskData} from "../../../App";

type TaskComponentProps = {
	task: TaskData;
}

function TaskComponent({task: props}: TaskComponentProps) {
	const getClassName = (task: TaskData) => {
		if (task.isCompleted) {
			return 'completed';
		}
		if (task.isInEditMode) {
			return 'editing';
		}
		return ''
	}

	return (
		<li className={getClassName(props)}>
			<div className="view">
				<input className="toggle" type="checkbox"/>
				<label>
					<span className="description">{props.text}</span>
					<span className="created">created 17 seconds ago</span>
				</label>
				<button className="icon icon-edit"/>
				<button className="icon icon-destroy"/>
			</div>
			{props.isInEditMode ? <input type="text" className="edit" value={props.text}/> : ''}
		</li>
	);
}

export default TaskComponent;
