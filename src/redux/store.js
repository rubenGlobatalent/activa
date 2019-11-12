import { createStore} from 'redux'
import * as turf from '@turf/turf'
import districts from '../assets/data/districts.json'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 */
const initialState = {
  activities: turf.featureCollection([]),
  districts: districts,
  selectedActivity: null,
  user: null
};

const rootReducer = (state = initialState, action)  => {
  switch(action.type) {
    case `SET_ACTIVITIES`:
      return Object.assign({}, state, {
        activities: action.payload
      })
      case `SET_USER`:
        return Object.assign({}, state, {
          user: action.payload
        })
    case `SELECT_ACTIVITY`:
        return Object.assign({}, state, {
          selectedActivity: action.payload
        })
    default:
      return state
  }
}

// ACTIONS
export const setActivities = payload => {
  return { type: `SET_ACTIVITIES`, payload };
}

export const selectActivity = payload => {
  return { type: `SELECT_ACTIVITY`, payload };
}

export const setUser = payload => {
  return { type: `SET_USER`, payload };
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(rootReducer)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

// store.subscribe(() => console.log(store.getState()))

