import React from 'react';
import { FilterTypes } from '../../../App';

type TasksFilterProps = {
  filterValue: number;
  onSetFilter: (value: number) => void;
};

function TasksFilter(props: TasksFilterProps) {
  const buttonsData = [
    { label: 'All', value: FilterTypes.ALL },
    { label: 'Active', value: FilterTypes.UNCOMPLETED },
    { label: 'Completed', value: FilterTypes.COMPLETED },
  ];

  // eslint-disable-next-line react/no-array-index-key
  const buttons = buttonsData.map((event, i) => (
    <li key={i}>
      <button
        type="button"
        className={event.value === props.filterValue ? 'selected' : ''}
        onClick={() => props.onSetFilter(event.value)}
      >
        {event.label}
      </button>
    </li>
  ));
  return <ul className="filters">{buttons}</ul>;
}

export default TasksFilter;
