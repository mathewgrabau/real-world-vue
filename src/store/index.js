import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc123',
      name: 'Mathew Grabau'
    },
    events: [],
    eventCount: 0,
    categories: [
      'sustainability',
      'nature',
      'animal warfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  mutations: {
    // event is the payload
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT_COUNT(state, eventCount) {
      state.eventCount = eventCount
    }
  },
  // Always want to put mutations inside actions (according to the core Vue team). Idea is to increase scalability of the codebase.
  // NOTE: actions get dispatched from a component. The action takes care of committing the mutation.
  actions: {
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
    }
  },
  modules: {},
  getters: {
    categoriesLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
