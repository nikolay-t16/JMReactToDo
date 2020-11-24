import React, { ChangeEvent, FormEvent, useState } from 'react';

type NewTaskFormProps = {
  onAdd: (newText: string) => void;
};

function NewTaskForm(props: NewTaskFormProps) {
  const { onAdd } = props;
  const [inputText, setInputText] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setInputText(event.target.value);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputText.trim() === '') {
      return;
    }
    onAdd(inputText);
    setInputText('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input className="new-todo" value={inputText} onChange={onChange} placeholder="What needs to be done?" />
    </form>
  );
}

export default NewTaskForm;
