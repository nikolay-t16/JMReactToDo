import React from 'react';
import TaskComponent from '../../blocks/TaskComponent/TaskComponent';
import { TaskData } from '../../../App';

type TaskListProps = {
  tasks: TaskData[];
  onRemove: (i: number) => void;
  onStartEditing: (i: number) => void;
  onEdit: (i: number, newText: string) => void;
  onSetComplete: (i: number, isCompleted: boolean) => void;
};

function TaskList({ tasks, onRemove, onStartEditing, onEdit, onSetComplete }: TaskListProps) {
  // eslint-disable-next-line react/no-array-index-key
  const tasksNodes = tasks.map((task, i) => (
    <TaskComponent
      key={i}
      task={task}
      taskIndex={i}
      onRemove={onRemove}
      onStartEditing={onStartEditing}
      onEdit={onEdit}
      onSetComplete={onSetComplete}
    />
  ));

  return <ul className="todo-list">{tasksNodes}</ul>;
}

export default TaskList;
