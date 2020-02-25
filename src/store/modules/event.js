import EventService from '@/services/EventService.js'

export const state = {
  events: [],
  eventCount: 0,
  event: {}
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
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      // push it into the database here
      commit('ADD_EVENT', event) // Commit the event
    })
  },
  fetchEvents({ commit }, { perPage, currentPage }) {
    EventService.getEvents(perPage, currentPage)
      .then(response => {
        console.log(
          'the total event count is ' + response.headers['x-total-count']
        )
        commit('SET_EVENT_COUNT', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id) // See if there's a cached copy
    if (event !== undefined && event !== null) {
      // Cache hit, has a result.
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
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
