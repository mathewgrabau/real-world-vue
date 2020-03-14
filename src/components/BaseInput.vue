<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // Now we can pinpoint things
  props: {
    label: {
      type: String,
      template: ''
    },
    value: [String, Number] // Allow either one
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped></style>
