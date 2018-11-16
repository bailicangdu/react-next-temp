import * as types from './actionTypes'

export const testAdd = (count) => ({
  type: types.TEST_ADD,
  count,
})