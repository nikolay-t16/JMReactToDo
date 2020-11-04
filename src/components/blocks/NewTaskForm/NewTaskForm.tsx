import React, {ChangeEvent, FormEvent} from 'react';

type NewTaskFormProps = {
	onAdd: (newText: string) => void
};

type NewTaskFormState = {
	inputText: string
};

// class NewTaskForm extends React.Component<NewTaskFormProps,NewTaskFormState> {
//	public state: NewTaskFormState;
class NewTaskForm extends React.Component<NewTaskFormProps, NewTaskFormState> {
	public state: NewTaskFormState;

	public constructor(props: NewTaskFormProps) {
		super(props);
		this.state = {
			inputText: '',
		}
	}

	public onChange(e: ChangeEvent<HTMLInputElement>) {
		this.setState({inputText: e.target.value});
	};

	public onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const {inputText} = this.state;
		const {onAdd} = this.props;
		if (inputText.trim() === '') {
			return;
		}
		onAdd(inputText);
		this.setState({inputText: ''});
	}

	public render() {
		const {inputText} = this.state;
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<input
					className="new-todo"
					value={inputText}
					onChange={this.onChange.bind(this)}
					placeholder="What needs to be done?"
					autoFocus
				/>
			</form>
		);
	}

}

export default NewTaskForm;
