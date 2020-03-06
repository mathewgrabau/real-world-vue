<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <label for>Select a category</label>
      <select v-model="event.category">
        <option v-for="category in categories" :key="category">
          {{
          category
          }}
        </option>
      </select>
      <h3>Name and describe your event</h3>
      <div class="field">
        <label for>Title</label>
        <input type="text" placeholder="Add an event title" v-model="event.title" />
      </div>
      <div class="field">
        <label for>Description</label>
        <input type="text" placeholder="Add a description" v-model="event.description" />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label for>Location</label>
        <input type="text" placeholder="Add a location" v-model="event.location" />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label for>Date</label>
        <DatePicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label for>Select a time</label>
        <select name id v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import DatePicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  components: {
    DatePicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; ++i) {
      times.push(i + ':00')
    }

    return {
      times,
      event: this.createFreshEvent(),
      categories: this.$store.state.categories
    }
  },
  methods: {
    createEvent() {
      NProgress.start()
      // Takes care of invoking the action needed to add the event into the database
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.event = this.createFreshEvent()
        })
        .catch(() => {
          NProgress.done() // End in the case of an error
        })
    },
    createFreshEvent() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  // Using the mapState to replace manually implementing computed properties.
  // Strings to do mapping works nicely as well.
  // The object spread operator is ... and it allows mixing the local and mapped
  computed: {
    categoriesLength() {
      return this.$store.getters.categoriesLength
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
