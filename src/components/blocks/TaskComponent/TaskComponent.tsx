import React, { ChangeEvent, FormEvent, useState } from 'react';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import TaskData from '../../../types/TaskData';
import TaskTimer from '../TaskTimer/TaskTimer';

type TaskComponentProps = {
  task: TaskData;
  taskIndex: number;
  onRemove: (i: number) => void;
  onStartEditing: (i: number) => void;
  onEdit: (i: number, newText: string) => void;
  onSetComplete: (i: number, isCompleted: boolean) => void;
  onChangeTimer: (i: number, value: number) => void;
};

function TaskComponent(props: TaskComponentProps) {
  const { task, taskIndex, onRemove, onStartEditing, onEdit, onSetComplete, onChangeTimer } = props;

  const [inputText, setInputText] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText.trim() === '') {
      return;
    }
    onEdit(taskIndex, inputText);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setInputText(event.target.value);

  const onChangeCompleted = () => onSetComplete(taskIndex, !task.isCompleted);

  const onChangeTimerHandler = (value: number) => onChangeTimer(taskIndex, value);

  const makeClassName = () => {
    if (task.isInEditMode) {
      return 'editing';
    }
    if (task.isCompleted) {
      return 'completed';
    }
    return '';
  };

  const className = makeClassName();

  const editInput = (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={inputText} onChange={onChange} />
    </form>
  );
  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" checked={task.isCompleted} onChange={onChangeCompleted} type="checkbox" />
        <label>
          <span className="title">{task.text}</span>
          <span className="description">
            {/* eslint-disable-next-line no-console */}
            <TaskTimer timerValue={task.spentTime} onChangeTimer={(val) => onChangeTimerHandler(val)} />
          </span>
          <span className="description">created {formatDistanceToNow(task.date, { includeSeconds: true })} ago</span>
        </label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="icon icon-edit" type="button" onClick={() => onStartEditing(taskIndex)} />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="icon icon-destroy" type="button" onClick={() => onRemove(taskIndex)} />
      </div>
      {task.isInEditMode ? editInput : ''}
    </li>
  );
}

export default TaskComponent;
