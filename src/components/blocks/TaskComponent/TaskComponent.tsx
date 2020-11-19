import React, { ChangeEvent, FormEvent } from 'react';

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

type TaskComponentState = {
  inputText: string;
};

class TaskComponent extends React.Component<TaskComponentProps, TaskComponentState> {
  public state: TaskComponentState;

  constructor(props: TaskComponentProps) {
    super(props);
    this.state = {
      inputText: props.task.text,
    };
  }

  protected onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { inputText } = this.state;
    const { taskIndex, onEdit } = this.props;
    if (inputText.trim() === '') {
      return;
    }
    onEdit(taskIndex, inputText);
  }

  protected onChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ inputText: event.target.value });
  }

  protected onChangeCompleted() {
    const { taskIndex, onSetComplete, task } = this.props;
    onSetComplete(taskIndex, !task.isCompleted);
  }

  protected onChangeTimer(value: number) {
    const { taskIndex, onChangeTimer } = this.props;
    onChangeTimer(taskIndex, value);
  }

  protected get className() {
    const { task } = this.props;
    if (task.isInEditMode) {
      return 'editing';
    }
    if (task.isCompleted) {
      return 'completed';
    }
    return '';
  }

  public render() {
    const { inputText } = this.state;
    const { task, taskIndex, onStartEditing, onRemove } = this.props;
    const editInput = (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" className="edit" value={inputText} onChange={this.onChange.bind(this)} />
      </form>
    );
    return (
      <li className={this.className}>
        <div className="view">
          <input
            className="toggle"
            checked={task.isCompleted}
            onChange={this.onChangeCompleted.bind(this)}
            type="checkbox"
          />
          <label>
            <span className="title">{task.text}</span>
            <span className="description">
              {/* eslint-disable-next-line no-console */}
              <TaskTimer timerValue={task.spentTime} onChangeTimer={(val) => this.onChangeTimer(val)} />
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
}

export default TaskComponent;
