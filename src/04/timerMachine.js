import { createMachine, assign } from 'xstate';

const stopCountingOnZero = context => context.elapsed - context.interval <= context.duration
const addMinuteToTotalTimerDuration = assign({
  duration: context => context.duration + 60
})

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
        duration: 5,
        elapsed: 0,
      }),
      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TICK: [
          {
            cond: 'stopCountingOnZero',
            actions: assign({
              elapsed: (ctx) => ctx.elapsed + ctx.interval,
            }),
          },
          {
            target: 'expired'
          }
        ],
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: 'addMinuteToTotalTimerDuration',
        },
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
    expired: {
      on: {
        RESET: 'idle'
      }
    }
  },
}, {
  actions: {
    addMinuteToTotalTimerDuration: addMinuteToTotalTimerDuration
  },
  guards: {
    stopCountingOnZero: stopCountingOnZero
  }
});
