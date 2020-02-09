<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.name }} ({{ user.id }})</p>
    <p>{{ localComputed }}</p>
    <ul>
      <li v-for="category in categories" :key="category">{{ category }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // Using the mapState to replace manually implementing computed properties.
  // Strings to do mapping works nicely as well.
  // The object spread operator is ... and it allows mixing the local and mapped
  computed: {
    localComputed() {
      return 'Here is something'
    },
    ...mapState(['user', 'categories'])
  }
}
</script>
