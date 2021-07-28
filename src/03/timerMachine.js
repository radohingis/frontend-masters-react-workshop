import { createMachine, assign } from 'xstate';

const addMinute = assign({
  duration: context => context.duration + 60
})

const reset = assign({
  duration: 60,
  elapsed: 0,
})

const incrementElapsedByInterval = assign({
  elapsed: context => context.elapsed + context.interval
})

export const timerMachine = createMachine({
  initial: 'idle',
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      entry: reset,
      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TICK: {
          actions: incrementElapsedByInterval
        },
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: addMinute
        },
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
  },
});
