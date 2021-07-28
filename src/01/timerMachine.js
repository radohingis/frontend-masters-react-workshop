import { createMachine } from 'xstate';

export const timerMachine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        toggle: 'running'
      }
    },
    paused: {
      on: {
        toggle: 'running'
      }
    },
    running: {
      on: {
        toggle: 'paused',
        reset: 'idle'
      }
    }
  }
})

