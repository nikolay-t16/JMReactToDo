import React from "react";
import TaskComponent from "../../blocks/TaskComponent/TaskComponent";
import {TaskData} from "../../../App";

type TaskListProps = {
	tasks: TaskData[]
}

function TaskList(props: TaskListProps) {

	const tasks = props.tasks.map(_=> <TaskComponent task={_} />);

	return (
		<ul className="todo-list">
			{tasks}
		</ul>
	);
}

export default TaskList;
