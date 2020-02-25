import Vue from 'vue'
import Vuex from 'vuex'
// The next import declaration is import all public items into the user namespace
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, // use this module
    event
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal warfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})
