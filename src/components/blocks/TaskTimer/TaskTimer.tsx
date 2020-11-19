import React from 'react';

type TaskTimerProps = {
  timerValue: number;
  onChangeTimer: (val: number) => void;
};
type TaskTimerState = {
  startTime: number;
  isActive: boolean;
  label: string;
};

class TaskTimer extends React.Component<TaskTimerProps, TaskTimerState> {
  public state: TaskTimerState;

  protected interval: NodeJS.Timeout | null = null;

  public constructor(props: TaskTimerProps) {
    super(props);
    const { timerValue } = props;
    this.state = {
      label: this.toHHMMSS(timerValue),
      startTime: 0,
      isActive: false,
    };
  }

  public componentWillUnmount() {
    if (this.interval) {
      clearTimeout(this.interval);
    }
  }

  protected onStart() {
    this.setState({ isActive: true });
    if (!this.interval) {
      this.interval = setInterval(() => this.onTick(), 1000);
      this.setState({ startTime: Date.now() });
    }
  }

  protected onStop() {
    const { onChangeTimer, timerValue } = this.props;
    const { startTime } = this.state;
    this.setState({ isActive: false });

    if (this.interval) {
      clearTimeout(this.interval);
    }
    const newTimerValue = Date.now() - startTime + timerValue;
    onChangeTimer(newTimerValue);
    this.interval = null;
  }

  protected onTick() {
    const { isActive } = this.state;
    if (!isActive) {
      return;
    }
    this.setState(({ startTime }: TaskTimerState, { timerValue }: TaskTimerProps) => ({
      label: this.toHHMMSS(Date.now() - startTime + timerValue),
    }));
  }

  protected toHHMMSS(mileseconds: number) {
    const val = Math.floor(mileseconds / 1000);
    const hours = Math.floor(val / 3600);
    const minutes = Math.floor((val - hours * 3600) / 60);
    const seconds = val - hours * 3600 - minutes * 60;

    const strMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const strSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${hours ? `${hours}:` : ''}${strMinutes}:${strSeconds}`;
  }

  public render() {
    const { label } = this.state;
    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" onClick={() => this.onStart()} className="icon icon-play" />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" onClick={() => this.onStop()} className="icon icon-pause" />
        {label}
      </>
    );
  }
}

export default TaskTimer;
