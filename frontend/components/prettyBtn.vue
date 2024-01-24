<template>
    <div>
      <button class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-blue-700 text-white font-bold py-2 px-4 rounded mt-4">{{ content }}</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        default: "Click Me!"
      }
    },
  }
  </script>
  
  <style>
  /* Add Tailwind CSS classes here */
  </style>