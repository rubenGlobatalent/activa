import { createStore } from 'redux'
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
  user: null,
  comments: []
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
},
  saveState = state => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
  };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case `SET_COMMENTS`:
      return Object.assign({}, state, {
        comments: action.payload
      })
      case `DELETE_COMMENT`:
        return Object.assign({}, state, {
          comments: state.comments.filter(element => element.id !== action.payload.id)
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

export const setComments = payload => {
  return { type: `SET_COMMENTS`, payload };
}

export const deleteComment = payload => {
  return { type: `DELETE_COMMENT`, payload };
}

export const addComment = payload => {
  return { type: `ADD_COMMENT`, payload };
}
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(rootReducer, loadState())

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => saveState(store.getState()))

