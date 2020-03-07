import EventService from '@/services/EventService.js'

export const namespaced = true // Ensure your actions, etc go out using the event namespace

export const state = {
  events: [],
  eventCount: 0,
  event: {},
  perPage: 3
}

export const mutations = {
  // event is the payload
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT_COUNT(state, eventCount) {
    state.eventCount = eventCount
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  // Always want to put mutations inside actions (according to the core Vue team). Idea is to increase scalability of the codebase.
  // NOTE: actions get dispatched from a component. The action takes care of committing the mutation.{
  // rootState allows access to the state from outside the current/local scope
  createEvent({ commit, rootState, dispatch }, event) {
    console.log('The user creating the event is ' + rootState.user.user.name)

    return EventService.postEvent(event)
      .then(() => {
        // push it into the database here
        commit('ADD_EVENT', event) // Commit the event
        // Add a notification
        const notification = {
          type: 'success',
          message: 'Your event has been created'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { currentPage }) {
    // Now accessing the perPage through the state variable.
    return EventService.getEvents(state.perPage, currentPage)
      .then(response => {
        console.log(
          'the total event count is ' + response.headers['x-total-count']
        )
        commit('SET_EVENT_COUNT', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id) // See if there's a cached copy
    if (event !== undefined && event !== null) {
      // Cache hit, has a result.
      commit('SET_EVENT', event)
      return event
    } else {
      // Need to actually return the promise so that it can used properly in the components
      // Without it the then() operation won't work.
      return EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data)
        return response.data // Need to send that back to the client
      })
    }
  }
}

export const getters = {
  categoriesLength: state => {
    return state.categories.length
  },
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
