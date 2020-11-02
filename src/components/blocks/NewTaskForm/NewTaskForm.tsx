import React, {ChangeEvent, FormEvent} from 'react';

type NewTaskFormProps = {
	onAdd: (newText: string) => void
};

type NewTaskFormState = {
	inputText: string
};

class NewTaskForm extends React.Component<NewTaskFormProps,NewTaskFormState> {
	public state: NewTaskFormState;
	constructor(props: NewTaskFormProps){
		super(props);
		this.state = {
			inputText: '',
		}
	}

	protected onChange(e: ChangeEvent<HTMLInputElement>) {
		this.setState({inputText: e.target.value});
	};

	protected onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (this.state.inputText.trim() === '') {
			return;
		}
		this.props.onAdd(this.state.inputText);
		this.setState({inputText: ''});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<input
					className="new-todo"
					value={this.state.inputText}
					onChange={this.onChange.bind(this)}
					placeholder="What needs to be done?"
					autoFocus
				/>
			</form>
		);
	}

}

export default NewTaskForm;
