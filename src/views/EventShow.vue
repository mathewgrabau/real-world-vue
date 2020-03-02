<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by: {{ event.organizer }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <BaseIcon name="map">
      <h2>Location</h2>
    </BaseIcon>
    <address>{{ event.location }}</address>
    <h2>Event Details</h2>
    <p>{{ event.description }}</p>
    <h2>
      Attendees
      <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import store from '@/store'

export default {
  props: ['id'],
  computed: mapState({
    event: state => state.event.event // Different syntax for mapping it, prevent from needing so many updates to this component
  }),
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    // the component object (this) is not available during this event handling time, so it's necessary to use
    // this format to dispatch the store action
    store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
      // Finish the progress bar when the promise is done
      NProgress.done()
      next()
    })
  },
  created() {}
}
</script>
