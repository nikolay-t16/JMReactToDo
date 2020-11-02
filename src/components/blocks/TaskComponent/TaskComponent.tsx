import React, {ChangeEvent, FormEvent} from 'react';
import {TaskData} from "../../../App";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
type TaskComponentProps = {
	task: TaskData;
	taskIndex: number;
	onRemove: (i: number) => void;
	onStartEditing: (i: number) => void;
	onEdit: (i: number, newText: string) => void
	onSetComplete: (i: number, isCompleted: boolean) => void
}

type TaskComponentState = {
	inputText:string;
}

class TaskComponent extends React.Component<TaskComponentProps, TaskComponentState> {
	public state: TaskComponentState;

	constructor(props: TaskComponentProps) {
		super(props);
		this.state = {
			inputText: props.task.text,
		}
	}

	protected get className() {
		if (this.props.task.isInEditMode) {
			return 'editing';
		}
		if (this.props.task.isCompleted) {
			return 'completed';
		}
		return ''
	}

	protected onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (this.state.inputText.trim() === '') {
			return;
		}
		this.props.onEdit(this.props.taskIndex, this.state.inputText);
	}

	protected onChange(e: ChangeEvent<HTMLInputElement>) {
		this.setState({inputText: e.target.value});
	};

	protected onChangeCompleted(e: ChangeEvent<HTMLInputElement>) {
		this.props.onSetComplete(this.props.taskIndex, !this.props.task.isCompleted);
	};

	public render() {
		const editInput = <form onSubmit={this.onSubmit.bind(this)}>
			<input type="text" className="edit" value={this.state.inputText} onChange={this.onChange.bind(this)}/>
		</form>;
		return (
			<li className={this.className}>
				<div className="view">
					<input className="toggle" checked={this.props.task.isCompleted} onChange={this.onChangeCompleted.bind(this)} type="checkbox"/>
					<label>
						<span className="description">{this.props.task.text}</span>
						<span
							className="created"
						>
							created {formatDistanceToNow(this.props.task.date, {includeSeconds: true})} ago
						</span>
					</label>
					<button className="icon icon-edit" type="button" onClick={() => this.props.onStartEditing(this.props.taskIndex)}/>
					<button className="icon icon-destroy" type="button" onClick={() => this.props.onRemove(this.props.taskIndex)}/>
				</div>
				{this.props.task.isInEditMode ? editInput : ''}
			</li>
		);
	}
}

export default TaskComponent;
