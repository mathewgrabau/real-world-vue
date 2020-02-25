<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <template v-if="currentPage != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: currentPage - 1 } }"
        rel="prev"
      >Prev Page</router-link>
    </template>
    <template v-if="currentPage * perPage < eventCount">
      <router-link
        :to="{ name: 'event-list', query: { page: currentPage + 1 } }"
        rel="next"
      >Next Page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: { EventCard },
  created() {
    // Dispatch the event to pull the listing of the events
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      currentPage: this.currentPage
    })
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
    perPage() {
      return parseInt(this.$route.query.perPage) || 3
    },
    ...mapState(['events', 'eventCount', 'user'])
  }
}
</script>

<style scoped></style>
