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
