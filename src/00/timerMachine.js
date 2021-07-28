export const timerMachineConfig = {
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
};

export const timerMachine = (state, event) => timerMachineConfig.states[state]?.on?.[event.type] || state
