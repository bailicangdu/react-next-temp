import * as types from './actionTypes';

const initialState = {
  count: 0
};

export const testReducer = (state = initialState, action: {[key: string]: string} = {}) => {
  switch (action.type) {
    case types.TEST_ADD:
      return Object.assign({}, state, {
        count: action.count + 1,
        testcount: 12431,
      })
    default: return state
  }
}
