import React, { useEffect, useState } from 'react';

type TaskTimerProps = {
  timerValue: number;
  onChangeTimer: (val: number) => void;
};

function TaskTimer(props: TaskTimerProps) {
  const toHHMMSS = (mileseconds: number) => {
    const val = Math.floor(mileseconds / 1000);
    const hours = Math.floor(val / 3600);
    const minutes = Math.floor((val - hours * 3600) / 60);
    const seconds = val - hours * 3600 - minutes * 60;

    const strMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const strSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${hours ? `${hours}:` : ''}${strMinutes}:${strSeconds}`;
  };

  const { timerValue, onChangeTimer } = props;
  const [startTime, setStartTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(toHHMMSS(timerValue));

  let interval: NodeJS.Timeout | null = null;
  useEffect(() => {
    return function cleanup() {
      if (interval) {
        clearTimeout(interval);
      }
    };
  });

  const onTick = () => {
    if (!isActive) {
      return;
    }
    setLabel(toHHMMSS(Date.now() - startTime + timerValue));
  };

  const onStart = () => {
    setIsActive(true);
    if (!interval) {
      interval = setInterval(() => onTick(), 1000);
      setStartTime(Date.now());
    }
  };

  const onStop = () => {
    setIsActive(false);

    if (interval) {
      clearTimeout(interval);
    }
    const newTimerValue = Date.now() - startTime + timerValue;
    onChangeTimer(newTimerValue);
    interval = null;
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" onClick={onStart} className="icon icon-play" />
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" onClick={onStop} className="icon icon-pause" />
      {label}
    </>
  );
}

export default TaskTimer;
