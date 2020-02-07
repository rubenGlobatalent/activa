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
  events: turf.featureCollection([]),
  categories_activities: [],
  filters_activities: [],
  filters_districts: [],
  comments: [],
  districts: districts,
  selected: null,
  user: null,
  mode: 'activities',
  fetching: true,
  steps_visibility: true
}

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
}
const saveState = state => {
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
      const categories = new Set(turf.propReduce(action.payload, (acc, current) => [...acc, current.sport], []))
      return { ...state, activities: action.payload, categories_activities: Array.from(categories) }
    case `SET_EVENTS`:
      return Object.assign({}, state, {
        events: action.payload
      })
    case `SET_ACTIVITY_FILTER`:
      return Object.assign({}, state, {
        filters_activities: action.payload
      })
    case `SET_DISTRICT_FILTER`:
      return Object.assign({}, state, {
        filters_districts: action.payload
      })
    case `SET_USER`:
      return Object.assign({}, state, {
        user: action.payload
      })
    case `SET_COMMENTS`:
      return Object.assign({}, state, {
        comments: action.payload
      })
    case `SELECT_FEATURE`:
      return Object.assign({}, state, {
        selected: action.payload
      })
    case `DELETE_COMMENT`:
      return Object.assign({}, state, {
        comments: state.comments.filter(element => element.id !== action.payload.id)
      })
    case `DELETE_FILTERS`:
      return Object.assign({}, state, {
        filters_activities: [],
        filters_districts: [],
      })
    case `ADD_COMMENT`:
      return Object.assign({}, state, {
        comments: [...action.payload, ...state.comments]
      })
    case `SET_MODE`:
      return Object.assign({}, state, {
        mode: action.payload
      })
    case `SET_FETCHING`:
      return { ...state, fetching: action.payload }
    case `SET_STEPS_VISIBILITY`:
      return { ...state, steps_visibility: action.payload }
    default:
      return state
  }
}

// ACTIONS
export const setActivities = payload => {
  return { type: `SET_ACTIVITIES`, payload };
}

export const setEvents = payload => {
  return { type: `SET_EVENTS`, payload };
}

export const setActivityFilter = payload => {
  return { type: `SET_ACTIVITY_FILTER`, payload };
}

export const setDistrictFilter = payload => {
  return { type: `SET_DISTRICT_FILTER`, payload };
}

export const selectFeature = payload => {
  return { type: `SELECT_FEATURE`, payload };
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

export const deleteFilters = payload => {
  return { type: `DELETE_FILTERS`, payload };
}

export const addComment = payload => {
  return { type: `ADD_COMMENT`, payload };
}

export const setMode = payload => {
  return { type: `SET_MODE`, payload };
}

export const setFetching = payload => {
  return { type: `SET_FETCHING`, payload };
}

export const setShowSteps = payload => {
  return { type: `SET_STEPS_VISIBILITY`, payload };
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(rootReducer, loadState())

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => saveState(store.getState()))

