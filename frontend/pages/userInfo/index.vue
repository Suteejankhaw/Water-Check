<template>
    <div>
      <h1>{{ title }}</h1>
      <p>{{ paragraph }}</p>
      <button @click="buttonClicked">{{ buttonText }}</button>
      <LinkBtn/>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: 'Welcome to Vue.js',
        paragraph: 'This is a template with a title, paragraph, and button.',
        buttonText: 'Click me'
      }
    },
    methods: {
      buttonClicked() {
        alert('Button clicked!');
      }
    }
  }
  </script>