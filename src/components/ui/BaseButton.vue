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

.accept:hover,
.accept:active {
  background-color: #26e71c;
  border-color: #26e71c;
}

.reject:hover,
.reject:active {
  background-color: #cc0a27;
  border-color: #cc0a27;
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

.accept {
  background-color: #66eb5f;
  border-color: #66eb5f;
}

.reject {
  background-color: #ed0e2f;
  border-color: #ed0e2f;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #f58293;
}
</style>