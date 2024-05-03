<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #ffb6c1;
  border: 1px solid #ffb6c1;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #ffb6c1;
  border-color: #ffb6c1;
}

.flat {
  background-color: transparent;
  color: #ffb6c1;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #f791a1;
  color: #f791a1;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #f58293;
}
</style>