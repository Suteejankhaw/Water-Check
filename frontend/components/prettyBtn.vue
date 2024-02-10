<template>
  <div>
    <button
      :class="{ 'w-full': isFullWidth }"
      class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      @click="$emit('click')"
    >
      {{ content }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: "Click Me!"
    },
    isFullWidth: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style>
/* No additional styles needed since we're using Tailwind CSS classes */
</style>
