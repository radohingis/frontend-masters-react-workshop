import * as React from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressCircle } from '../ProgressCircle';
import { useMachine } from '@xstate/react'
import { timerMachine } from './timerMachine';

export const Timer = () => {
  const [state, send] = useMachine(timerMachine)

  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  };

  return (
    <div
      className="timer"
      data-state={state.value} // Hint!
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 01</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.value}</div>
        <div
          className="elapsed"
          onClick={() => {
            send({ type: 'toggle' })
          }}
        >
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {state !== 'running' &&
            <button
              onClick={() => {
                send({ type: 'reset' })
              }}
            >
              Reset
            </button>
          }
        </div>
      </div>
      <div className="actions">
        {state !== 'paused' &&
          <button
            onClick={() => {
              send({ type: 'toggle' })
            }}
            title="Pause timer"
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        }

        {state !== 'running' &&
          <button
            onClick={() => {
              send({ type: 'toggle' })
            }}
            title="Start timer"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        }
      </div>
    </div>
  );
};
