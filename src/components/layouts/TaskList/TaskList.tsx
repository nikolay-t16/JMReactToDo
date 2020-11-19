import React from 'react';
import TaskComponent from '../../blocks/TaskComponent/TaskComponent';
import TaskData from '../../../types/TaskData';

type TaskListProps = {
  tasks: TaskData[];
  onRemove: (i: number) => void;
  onStartEditing: (i: number) => void;
  onEdit: (i: number, newText: string) => void;
  onSetComplete: (i: number, isCompleted: boolean) => void;
  onChangeTimer: (i: number, value: number) => void;
};

function TaskList({ tasks, onRemove, onStartEditing, onEdit, onSetComplete, onChangeTimer }: TaskListProps) {
  const tasksNodes = tasks.map((task, i) => (
    <TaskComponent
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      task={task}
      taskIndex={i}
      onRemove={onRemove}
      onStartEditing={onStartEditing}
      onEdit={onEdit}
      onSetComplete={onSetComplete}
      onChangeTimer={onChangeTimer}
    />
  ));

  return <ul className="todo-list">{tasksNodes}</ul>;
}

export default TaskList;
