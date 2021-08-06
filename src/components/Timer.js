import React, { useEffect, useState } from "react";
import "./Timer.css";

let hours = "0";
let minutes = "0";
let seconds = "0";
let waitClickCounter = 0;

function Timer() {
  const [timer, setTimer] = useState("00:00:00");
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [wait, setWait] = useState(false);
  const [reset, setReset] = useState(false);

  const onStart = () => {
    if (wait) {
      setTimer((prev) => prev);
      setWait(false);
    }
    setIsTimerOn(true);
  };
  const onStop = () => {
    setIsTimerOn(false);
    hours = "0";
    minutes = "0";
    seconds = "0";
  };

  useEffect(() => {
    let interval = null;

    if (isTimerOn) {
      interval = setInterval(() => {
        seconds++;

        if (+seconds === 60) {
          seconds = 0;
          minutes++;
        }
        if (+minutes === 60) {
          minutes = 0;
          hours++;
        }

        seconds = "" + seconds;
        minutes = "" + minutes;
        hours = "" + hours;
        setTimer(
          `${hours.padStart(2, 0)}:${minutes.padStart(2, 0)}:${seconds.padStart(
            2,
            0
          )}`
        );
      }, 1000);
    } else if (!isTimerOn && !wait) {
      setTimer("00:00:00");
    }
    if (wait) {
      setTimer(timer);
      setIsTimerOn(false);
    }
    return () => clearInterval(interval);
  }, [isTimerOn, reset]);

  const onReset = () => {
    setReset(!reset);
    setTimer("00:00:00");
    hours = "0";
    minutes = "0";
    seconds = "0";
    setWait(false);
    if (!isTimerOn) setIsTimerOn(true);
  };

  const onWait = () => {
    waitClickCounter++;
    if (waitClickCounter > 1) {
      setWait(true);
      setIsTimerOn(false);
    }

    const timeOut = setTimeout(() => {
      waitClickCounter = 0;
    }, 300);
    console.log(waitClickCounter);
  };

  const startOrStop = isTimerOn ? "Stop" : "Start";
  const btnClass = `btn ${startOrStop}`;

  return (
    <div className="container">
      <h1>{timer}</h1>
      <button className={btnClass} onClick={isTimerOn ? onStop : onStart}>
        {startOrStop}
      </button>
      <button className="btn wait" onClick={onWait}>
        Wait
      </button>
      <button className="btn reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default Timer;
