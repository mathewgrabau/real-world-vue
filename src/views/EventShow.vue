<template>
  <h1>Showing event #{{ id }} {{ event.title }}</h1>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: ['id'],
  data() {
    return {
      event: Object
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        // Setting in the received response.
        this.event = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
