<template>
  <div>
    <h1>Create Event, {{ userName }}</h1>
    <p>This event was created by {{ userName }} ({{ userId }})</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // Using the mapState to replace manually implementing computed properties.
  computed: mapState({
    userName: state => state.user.name,
    userId: state => state.user.id,
    categories: state => state.categories
  })
}
</script>
