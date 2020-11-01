import React from "react";
import TaskComponent from "../../blocks/TaskComponent/TaskComponent";
import {TaskData} from "../../../App";

type TaskListProps = {
	tasks: TaskData[]
	onRemove: (i: number) => void
	onStartEditing: (i: number) => void
	onEdit: (i: number, newText: string) => void
	onSetComplete: (i: number, isCompleted: boolean) => void
}

function TaskList(props: TaskListProps) {

	const tasks = props.tasks.map((e, i) => <TaskComponent
		key={i}
		task={e}
		taskIndex={i}
		onRemove={props.onRemove}
		onStartEditing={props.onStartEditing}
		onEdit={props.onEdit}
		onSetComplete={props.onSetComplete}
	/>);

	return (
		<ul className="todo-list">
			{tasks}
		</ul>
	);
}

export default TaskList;
