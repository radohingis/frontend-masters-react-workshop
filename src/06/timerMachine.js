import { createMachine, assign } from 'xstate';

const timerExpired = (ctx) => ctx.elapsed >= ctx.duration;

export const timerMachine = createMachine({
  initial: 'idle',
  context: {
    duration: 5,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      entry: assign({
        duration: 3,
        elapsed: 0,
      }),
      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      initial: 'normal',
      states: {
        normal: {
          always: {
            cond: timerExpired,
            target: 'overtime',
          },
          on: {
            RESET: undefined // do nothing on this event in this state !!
          }
        },
        overtime: {
          on: {
            TOGGLE: undefined // do nothing on this event in this state !!
          }
        }
      },
      on: {
        TICK: {
          actions: assign({
            elapsed: (ctx) => ctx.elapsed + ctx.interval,
          }),
        },
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: assign({
            duration: (ctx) => ctx.duration + 60,
          }),
        },
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
      },
    },
  },
  on: {
    RESET: {
      target: '.idle',
    },
  },
});
