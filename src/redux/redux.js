import { createStore as reduxCreateStore } from "redux"

import CONSTANTS from '../utils/constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.PAGE_MOUNTED:
      return Object.assign({}, state, {
        pageMounted: action.pageMounted,
      })
      break

    default:
      return state
  }
}

const initialState = { pageMounted: false }

const createStore = () => reduxCreateStore(reducer, initialState)

export default createStore

export function changePageMountedStatus(pageMounted) {
  return {
    type: CONSTANTS.PAGE_MOUNTED,
    pageMounted
  }
}
